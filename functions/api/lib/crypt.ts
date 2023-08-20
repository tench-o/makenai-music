import { Context } from 'hono';

const iterations = 100000;

const encrypt = async (c: Context, plain: string, saltStr: string): Promise<string> => {
    const secretPassword = c.env.APP_SECRET
    const salt = new TextEncoder().encode(saltStr);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secretPassword),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const derivedKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: iterations, hash: "SHA-256" },
        cryptoKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt"]
    );

    const encoded = new TextEncoder().encode(plain);
    const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, derivedKey, encoded);

    const result = new Uint8Array(iv.length + encrypted.byteLength);
    result.set(iv);
    result.set(new Uint8Array(encrypted), iv.length);

    return Array.from(result).map(byte => byte.toString(16).padStart(2, '0')).join('');
};

const decrypt = async (c: Context, encryptedHex: string, saltStr: string): Promise<string> => {
    const secretPassword = c.env.APP_SECRET
    const encrypted = new Uint8Array(encryptedHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));

    const salt = new TextEncoder().encode(saltStr);
    const iv = encrypted.slice(0, 12);
    const value = encrypted.slice(12);

    const cryptoKey = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(secretPassword),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    const derivedKey = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt: salt, iterations: iterations, hash: "SHA-256" },
        cryptoKey,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
    );

    const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, derivedKey, value);

    return new TextDecoder().decode(decrypted);
};


export {
    encrypt,
    decrypt
}
