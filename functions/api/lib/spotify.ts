import { Context } from 'hono';
import { UserData } from './access-token';
import { base64Encode } from './base64';

const refreshToken = async (c: Context, userData: UserData): Promise<string> => {
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
        body: body.toString()
    })

    const data = await res.json<{
        access_token: string
    }>()

    return data.access_token
}


export {
    refreshToken
}
