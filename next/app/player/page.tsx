'use client'
import { useDevices } from '@/hooks/useDevices'
import { useSearchParams, redirect } from 'next/navigation'


export default function Player() {
    // Queryからdevice_idを取得
    const searchParams = useSearchParams()
    const deviceId = searchParams.get("device_id")
    const { device, isLoading, error } = useDevices()

    if (error?.message === "Unauthorized") {
        redirect("/api/auth")
    }

    const copyToClipboard = async (resultText: string) => {
        await global.navigator.clipboard.writeText(resultText);
        alert("IFTTT Webhook用のURLをコピーしました\n取り扱いには注意してください。他の人このURLを知ると、勝手に走りたくなる音楽を再生させられます。")
    };

    const getPlayerUrl = (uid: string, ud: string, trackId: string) => {
        return `${location.protocol}://${location.host}/api/play?track_id=${trackId}&device_id=${deviceId}&uid=${uid}&ud=${ud}`
    }

    const getAllPlayerUrl = (uid: string, ud: string) => {
        return `${location.protocol}://${location.host}/api/package/v1?device_id=${deviceId}&uid=${uid}&ud=${ud}`
    }

    return (
        <main>
            {device && (
                <div>
                    <h1>勝手にいい感じの曲を再生してもらう</h1>
                    <ul>
                        <li><button onClick={() => { copyToClipboard(getAllPlayerUrl(device.uid, device.ud)) }}>URLをクリップボードにコピー</button></li>
                    </ul>
                    <h1>手動で再生する曲を自分で決める</h1>
                    <ul>
                        <li>RUNNER: <button onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '5Llyy2C7bCvSvvyvtrJVcI')) }}>URLをクリップボードにコピー</button></li>
                        <li>TOMORROW: <button onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '1KZUhS8ADGo3DZHzuhKaQD')) }}>URLをクリップボードにコピー</button></li>
                        <li>負けないで:<button onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '7og9wvfr4puwj0WtowXStj')) }}>URLをクリップボードにコピー</button></li>
                        <li>サライ:<button onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '3svdAAnZma6dXqxYx66IwM')) }}>URLをクリップボードにコピー</button></li>
                    </ul>
                </div>
            )}
        </main>
    )
}
