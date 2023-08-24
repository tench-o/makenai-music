import { Context } from 'hono';
import { OauthToken } from './access-token';
import { base64Encode } from './base64';
import { getCallbackUrl } from './utils';

type SpotifyUserProfile = {
    uri: string
}

type Device = {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    supports_volume: boolean;
    type: string;
    volume_percent: number;
};

type AvailableDeviceResponse = {
    devices: Device[]
}

const refreshToken = async (c: Context, userData: OauthToken): Promise<string> => {
    const tokenBase64 = base64Encode(c.env.SPOTIFY_CLIENT_ID + ':' + c.env.SPOTIFY_CLIENT_SECRET)
    const body = new URLSearchParams
    body.append('grant_type', 'refresh_token')
    body.append('refresh_token', userData.refresh_token)

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (tokenBase64)
        },
        body: body.toString(),
    })

    if (!res.ok) {
        return ""
    }

    const data = await res.json<{
        access_token: string
    }>()

    return data.access_token
}

const getAccessToken = async (c: Context, code: string, state: string): Promise<OauthToken> => {
    const tokenBase64 = base64Encode(c.env.SPOTIFY_CLIENT_ID + ':' + c.env.SPOTIFY_CLIENT_SECRET)
    const body = new URLSearchParams
    body.append('code', code as string)
    body.append('redirect_uri', getCallbackUrl(c))
    body.append('grant_type', 'authorization_code')

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (tokenBase64)
        },
        body: body.toString()
    })

    const data = await res.json<OauthToken>()

    return data
}

const getUserProfile = async (c: Context, accessToken: string): Promise<SpotifyUserProfile> => {
    const userDataRes = await fetch("https://api.spotify.com/v1/me", {
        method: 'GET',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Bearer ' + accessToken
        }
    })

    const userData = await userDataRes.json<SpotifyUserProfile>()
    return userData
}

const getAvailableDevices = async (c: Context, accessToken: string): Promise<AvailableDeviceResponse> => {
    const devicesRes = await fetch("https://api.spotify.com/v1/me/player/devices", {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded",
            'Authorization': 'Bearer ' + accessToken
        },
        method: 'GET'
    })

    const devices = await devicesRes.json<AvailableDeviceResponse>()

    return devices
}

const setTrackIdsToAvailableDevice = async (c: Context, accessToken: string, deviceId: string, trackIds: string[]) => {
    const request = {
        uris: trackIds
    }

    return await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        headers: {
            'Content-Type': "application/json",
            'Authorization': 'Bearer ' + accessToken
        },
        method: 'PUT',
        body: JSON.stringify(request)
    })
}


export {
    refreshToken,
    getAccessToken,
    getUserProfile,
    getAvailableDevices,
    setTrackIdsToAvailableDevice
}
