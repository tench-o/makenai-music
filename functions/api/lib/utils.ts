import { Context } from 'hono'

const isProduction = (c: Context): boolean => {
    const env = c.env.APP_ENV || "development"
    if (env === "production") {
        return true
    }

    return false
}

const getApiHost = (c: Context): string => {
    if (isProduction(c)) {
        return "https://makenai-music.pages.dev"
    }

    return "http://127.0.0.1:8788"
}

const getCallbackUrl = (c: Context): string => {
    return `${getApiHost(c)}/api/callback`
}


export {
    getApiHost,
    isProduction,
    getCallbackUrl
}
