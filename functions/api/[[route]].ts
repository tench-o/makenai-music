import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { setCookie, getCookie } from 'hono/cookie'
import { uuid } from '@cfworker/uuid';

import { encrypt } from './lib/crypt';
import { base64Encode } from './lib/base64';
import { getUserData } from './lib/access-token';
import { getAccessToken, getAvailableDevices, getUserProfile, refreshToken, setTrackIdsToAvailableDevice } from './lib/spotify';
import { getAllSpotifyContentUri, getSpotifyContentUri } from './lib/music';
import { getCallbackUrl } from './lib/utils';

type Bindings = {
  SPOTIFY_CLIENT_ID: string
  SPOTIFY_CLIENT_SECRET: string
  APP_SECRET: string
  NODE_ENV: string
}

const app = new Hono<{ Bindings: Bindings }>().basePath('/api')

app.get('/auth', async (c) => {

  const state = uuid();
  const scope = 'user-modify-playback-state user-read-playback-state';

  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', c.env.SPOTIFY_CLIENT_ID as string || "");
  params.append('scope', scope);
  params.append('redirect_uri', getCallbackUrl(c));
  params.append('state', state);

  return c.redirect('https://accounts.spotify.com/authorize?' +
    params.toString()
  )
})

app.get('/callback', async (c) => {

  const code = c.req.query("code") || ""
  const state = c.req.query("state") || ""

  if (state === null) {
    return c.redirect('/#' + "error=state_mismatch");
  } else {
    const data = await getAccessToken(c, code, state)

    const profile = await getUserProfile(c, data.access_token)
    const uri = profile.uri
    const cryptedUserData = await encrypt(c, JSON.stringify(data), uri)

    setCookie(c, 'ud', cryptedUserData, {
      path: '/',
      httpOnly: true,
      maxAge: data.expires_in,
    })


    setCookie(c, 'uid', base64Encode(uri), {
      path: '/',
      httpOnly: true,
      maxAge: data.expires_in,
    })

    return c.redirect("/devices")
  }
})

app.get('/devices', async (c) => {
  const userData = await getUserData(c)

  if (userData.isLoggedIn === false) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  const devices = await getAvailableDevices(c, userData.access_token)

  return c.json({
    devices: devices,
    uid: encodeURIComponent(getCookie(c, 'uid') || ''),
    ud: encodeURIComponent(getCookie(c, 'ud') || '')
  })
})

app.post('/play', async (c) => {
  const trackId = c.req.query("track_id") || ""
  const deviceId = c.req.query("device_id") || ""

  const userData = await getUserData(c)
  if (userData.isLoggedIn === false) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }


  const accessToken = await refreshToken(c, userData)
  if (accessToken === "") {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  const uri = getSpotifyContentUri(trackId)
  await setTrackIdsToAvailableDevice(c, accessToken, deviceId, [uri])

  return c.text("ok")
})

// 曲を入れ替える可能性もあるから、適当にv1とか打っておこう
app.post('/package/v1', async (c) => {
  const deviceId = c.req.query("device_id") || ""

  const userData = await getUserData(c)
  if (userData.isLoggedIn === false) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  const accessToken = await refreshToken(c, userData)
  if (accessToken === "") {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  await setTrackIdsToAvailableDevice(c, accessToken, deviceId, getAllSpotifyContentUri())

  return c.text("ok")
})

export const onRequest = handle(app)
