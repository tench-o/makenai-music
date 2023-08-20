'use client'

import { useDevices } from '@/hooks/useDevices';
import { redirect } from 'next/navigation'

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

type Data = {
    devices: {
        devices: Device[];
    };
    uid: string;
    ud: string;
};

export default function Devices() {

    const { device, isLoading, error } = useDevices()

    if (error?.message === "Unauthorized") {
        redirect("/api/auth")
    }

    return (
        <main>
            <h1>利用するデバイスを選んで</h1>
            {device && device?.devices?.devices?.map((device) => {
                return (
                    <div key={device.id}>
                        <a href={`/player?device_id=${device.id}`}>{device.name}</a>
                    </div>
                )
            })}

        </main>
    )
}
