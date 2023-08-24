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
        alert("IFTTT Webhook用のURLをコピーしました。")
    };

    const getPlayerUrl = (uid: string, ud: string, trackId: string) => {
        return `${location.protocol}://${location.host}/api/play?track_id=${trackId}&device_id=${deviceId}&uid=${uid}&ud=${ud}`
    }

    const getAllPlayerUrl = (uid: string, ud: string) => {
        return `${location.protocol}//${location.host}/api/package/v1?device_id=${deviceId}&uid=${uid}&ud=${ud}`
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <section className="mb-10">
                <div className="py-8 px-4 mx-auto max-w-fit	 text-center lg:py-16">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        ゴールを演出する曲を選びましょう
                    </h1>
                    <p className="mb-20 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">コピーしたプレイリストURLをIFTTTのWebhook Appletsに登録して、作業完了。</p>
                    <div className="relative overflow-x-auto sm:rounded-lg max-w-screen-lg mx-auto mb-20">
                        <h2 className="text-4xl mb-20 font-extrabold dark:text-white text-center">良いタイミングで流します。</h2>
                        <p className="mb-10 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400 text-center">大体19分ぐらいありますので、ゴールから約3kmぐらい前(Chat GPT談)にIFTTTのLocationの設定をしておくと感動的です。</p>

                        <h2 className="text-2xl mb-10 dark:text-white text-center">ゴールまでの曲順</h2>

                        <div className="flex justify-center mb-10 ">
                            <ol className="items-center space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
                                <li className="flex items-center text-blue-600 dark:text-blue-500 space-x-2.5">
                                    <span className="flex items-center justify-center w-8 h-8 border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                                        1
                                    </span>
                                    <span>
                                        <h3 className="font-medium leading-tight">RUNNER</h3>
                                        <p className="text-sm">爆風スランプ</p>
                                    </span>
                                </li>
                                <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
                                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        2
                                    </span>
                                    <span>
                                        <h3 className="font-medium leading-tight">TOMORROW</h3>
                                        <p className="text-sm">岡本真夜</p>
                                    </span>
                                </li>
                                <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
                                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        3
                                    </span>
                                    <span>
                                        <h3 className="font-medium leading-tight">負けないで</h3>
                                        <p className="text-sm">ZARD</p>
                                    </span>
                                </li>
                                <li className="flex items-center text-gray-500 dark:text-gray-400 space-x-2.5">
                                    <span className="flex items-center justify-center w-8 h-8 border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                                        4
                                    </span>
                                    <span>
                                        <h3 className="font-medium leading-tight">サライ</h3>
                                        <p className="text-sm">加山雄三</p>
                                    </span>
                                </li>
                            </ol>

                        </div>


                        <div className="flex flex-col mb-10 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                            <a href="#" onClick={() => { copyToClipboard(getAllPlayerUrl(device.uid, device.ud)) }} >
                                <button className="px-8 py-4 text-sm font-bold text-white transition-colors duration-200 transform bg-gray-800 rounded-xl hover:scale-105 text-center ">
                                    <p>URLをコピー</p>
                                </button>
                            </a>
                        </div>

                        <h2 className="text-4xl font-extrabold dark:text-white text-center">流れるタイミングを自分でチューニングしたい人向け</h2>
                        <div className="flex justify-center">
                            <a href="#" onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '7og9wvfr4puwj0WtowXStj')) }} className="block max-w-md m-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <iframe className='mb-2' src="https://open.spotify.com/embed/track/5Llyy2C7bCvSvvyvtrJVcI?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">大きな玉ねぎが見えてくると流れてくる。</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">Runner / 爆風スランプ                 <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">URLをコピー</button>
                                </p>
                            </a>
                        </div>
                        <div className="flex justify-center">
                            <a href="#" onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '1KZUhS8ADGo3DZHzuhKaQD')) }} className="block max-w-md m-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <iframe className='mb-2' src="https://open.spotify.com/embed/track/1KZUhS8ADGo3DZHzuhKaQD?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">毎年ランダムだけど、これも定番。</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">TOMORROW / 岡本真夜                 <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">URLをコピー</button>
                                </p>
                            </a>
                        </div>

                        <div className="flex justify-center">

                            <a href="#" onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '7og9wvfr4puwj0WtowXStj')) }} className="block max-w-md m-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <iframe className='mb-2' src="https://open.spotify.com/embed/track/7og9wvfr4puwj0WtowXStj?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ゴールの直前の定番といえばこれ。</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">負けないで / Zard                 <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">URLをコピー</button>
                                </p>
                            </a>

                        </div>

                        <div className="flex justify-center">
                            <a href="#" onClick={() => { copyToClipboard(getPlayerUrl(device.uid, device.ud, '7og9wvfr4puwj0WtowXStj')) }} className="block max-w-md m-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <iframe className='mb-2' src="https://open.spotify.com/embed/track/3svdAAnZma6dXqxYx66IwM?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">この曲を聞きながら、ゴールイン。</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">サライ / 加山雄三                 <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">URLをコピー</button>
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {device && (
                <div></div>

            )}

            <p className="text-sm font-normal text-gray-500 lg:text-sm sm:px-16 lg:px-48 dark:text-gray-400">コピーURLには、自動で再生するための情報が含まれています。(ID/パスワードは含まれていません)他人が再生用のURLを知った場合には勝手に再生される可能性がありますのでご注意ください。<br />このアプリの利用を停止したい場合は、Spotifyのプロフィール画面から「<a href="https://www.spotify.com/jp/account/apps/" className='underline underline-offset-1' target="_blank">アプリの管理</a>」から「ランニングは地球を救う。」の[アクセス権を削除]を行ってください。</p>
        </main>
    )
}
