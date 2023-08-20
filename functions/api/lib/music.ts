// 絶対にこの4曲しか再生させない強い意志
// RUNNER が流れてくるとぶち上がるだろ。たぶん。
const TRACK_IDS = [
    '5Llyy2C7bCvSvvyvtrJVcI', // RUNNER
    '1KZUhS8ADGo3DZHzuhKaQD', // TOMORROW
    '7og9wvfr4puwj0WtowXStj', //負けないで
    '3svdAAnZma6dXqxYx66IwM' // サライ
]

const getSpotifyContentUri = (trackId: string): string => {
    if (TRACK_IDS.includes(trackId)) {
        return generateUri(trackId)
    }

    // 強制的にRUNNERでを流す強い決意
    return generateUri(TRACK_IDS[0])
}

const getAllSpotifyContentUri = (): string[] => {
    return TRACK_IDS.map((id) => generateUri(id))
}

const generateUri = (trackId: string): string => {
    return `spotify:track:${trackId}`
}

export {
    getSpotifyContentUri,
    getAllSpotifyContentUri,
}
