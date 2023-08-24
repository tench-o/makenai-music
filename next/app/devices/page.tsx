'use client'

import { useDevices } from '@/hooks/useDevices';
import { redirect } from 'next/navigation'

export default function Devices() {
    const { device, isLoading, error } = useDevices()

    if (error?.message === "Unauthorized") {
        redirect("/api/auth")
    }

    const playTestMusic = (uid: string, ud: string, deviceId: string) =>{
        const params = {
            uid,
            ud,
            device_id: deviceId,
            track_id: '7og9wvfr4puwj0WtowXStj'
        }

        const query_params = new URLSearchParams(params); 
        fetch('/api/play?' + query_params, {
            method: 'POST'
        })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <section className="mb-10">
                <div className="py-8 px-4 mx-auto max-w-fit	 text-center lg:py-16">
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        ゴールを演出する再生デバイスを選択してください
                    </h1>
                    <p className="mb-20 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">iOSアプリやAndroidアプリが表示されない場合は、お手元のデバイスで適当な曲を再生した上で再読み込みをしてみてください。</p>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-lg mx-auto mb-20">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Device Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {device && device?.devices?.devices?.map((d) => {
                                    return (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={d.id}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {d.is_active && <span>
                                                    🔊
                                                </span>}

                                                {d.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {d.type}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href={`/player?device_id=${d.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">このデバイスを利用</a>
                                                 | 
                                                <button onClick={() => {playTestMusic(device.uid, device.ud, d.id)}} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">テスト再生</button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>
                    </div>

                    <p className="mb-3 text-gray-500 dark:text-gray-400">このサービスでは、APIの結果やアクセストークンなどをサーバ側に保持してません。ので、リロードすると消えちゃいます。</p>
                </div>
            </section>
        </main>
    )
}
