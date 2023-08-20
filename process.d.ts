declare namespace NodeJS {
    interface ProcessEnv {
        readonly TOKEN: string;
        readonly NODE_ENV: 'development' | 'production' | 'test';
    }
}
