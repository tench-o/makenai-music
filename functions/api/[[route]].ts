import { Hono } from 'hono'
import { handle } from 'hono/cloudflare-pages'
import { uuid } from '@cfworker/uuid';
import { encrypt, decrypt } from './lib/crypt';

import { setCookie, getCookie } from 'hono/cookie'
import { base64Encode } from './lib/base64';
import { UserData, getUserData } from './lib/access-token';
import { refreshToken } from './lib/spotify';
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

  const code = c.req.query("code") || null
  const state = c.req.query("state") || null
  const tokenBase64 = base64Encode(c.env.SPOTIFY_CLIENT_ID + ':' + c.env.SPOTIFY_CLIENT_SECRET)

  if (state === null) {
    return c.redirect('/#' + "error=state_mismatch");
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: getCallbackUrl(c),
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (tokenBase64)
      },
      json: true
    }

    const body = new URLSearchParams
    body.append('code', code as string)
    body.append('redirect_uri', getCallbackUrl(c))
    body.append('grant_type', 'authorization_code')

    const res = await fetch(authOptions.url, {
      method: 'POST',
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + (tokenBase64)
      },
      body: body.toString()
    })

    const data = await res.json<UserData>()

    const userDataRes = await fetch("https://api.spotify.com/v1/me", {
      method: 'GET',
      headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization': 'Bearer ' + data.access_token
      }
    })

    const userData = await userDataRes.json<{ uri: string }>()
    const uri = userData.uri

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

  const devicesRes = await fetch("https://api.spotify.com/v1/me/player/devices", {
    headers: {
      'Content-Type': "application/x-www-form-urlencoded",
      'Authorization': 'Bearer ' + userData.access_token
    },
    method: 'GET'
  })

  const devices = await devicesRes.json<any>()

  return c.json({
    devices: devices,
    uid: encodeURIComponent(getCookie(c, 'uid') || ''),
    ud: encodeURIComponent(getCookie(c, 'ud') || '')
  })
})

app.post('/play', async (c) => {
  const trackId = c.req.query("track_id") || ""
  const device_id = c.req.query("device_id") || ""

  const userData = await getUserData(c)
  if (userData.isLoggedIn === false) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  const uri = getSpotifyContentUri(trackId)

  const request = {
    uris: [uri]
  }

  const accessToken = await refreshToken(c, userData)

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    headers: {
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + accessToken
    },
    method: 'PUT',
    body: JSON.stringify(request)
  })

  return c.text("ok")
})

// 曲を入れ替える可能性もあるから、適当にv1とか打っておこう
app.post('/package/v1', async (c) => {
  const device_id = c.req.query("device_id") || ""

  const userData = await getUserData(c)
  if (userData.isLoggedIn === false) {
    return c.json({ message: 'Unauthorized.' }, 401)
  }

  const request = {
    uris: getAllSpotifyContentUri()
  }

  const accessToken = await refreshToken(c, userData)

  await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
    headers: {
      'Content-Type': "application/json",
      'Authorization': 'Bearer ' + accessToken
    },
    method: 'PUT',
    body: JSON.stringify(request)
  })

  return c.text("ok")
})

export const onRequest = handle(app)
