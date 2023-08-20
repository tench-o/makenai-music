import useSWRImmutable from 'swr/immutable'
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
}

const fetcher = (url: string): Promise<any> => fetch(url).then(res => {
    if (res.status !== 200) throw new Error(res.statusText)
    return res.json()
})

export const useDevices = () => {
    const { data, error, isLoading } = useSWRImmutable('/api/devices', fetcher)

    return {
        device: data as Data,
        isLoading,
        error: error
    }
}
