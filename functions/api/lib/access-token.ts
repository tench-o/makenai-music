import { Context } from 'hono';
import { getCookie } from 'hono/cookie';
import { encrypt, decrypt } from './crypt';
import { base64Decode, base64Encode } from './base64';

type OauthToken = {
    access_token: string
    token_type: string
    scope: string
    expires_in: number
    refresh_token: string
    isLoggedIn: boolean
}

const getUserData = async (c: Context): Promise<OauthToken> => {
    const uid = c.req.query("uid") || getCookie(c, 'uid') || ''
    const cryptedUserData = c.req.query("ud") || getCookie(c, 'ud') || ''

    if (uid === "" || cryptedUserData === "") {
        const notLogin: OauthToken = {
            access_token: "",
            token_type: "",
            scope: "",
            expires_in: 0,
            refresh_token: "",
            isLoggedIn: false
        }

        return notLogin
    }

    const userDataStr = await decrypt(c, cryptedUserData, base64Decode(uid))
    const userData = JSON.parse(userDataStr) as OauthToken
    userData.isLoggedIn = true

    return userData
}

export {
    type OauthToken,
    getUserData
}
