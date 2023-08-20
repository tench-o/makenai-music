function base64Encode(fromString: string) {
    const utf8Encoder = new TextEncoder()
    const buf = (utf8Encoder.encode(fromString))

    let string = '';
    (new Uint8Array(buf)).forEach(
        (byte) => { string += String.fromCharCode(byte) }
    )
    return btoa(string)
}

function base64Decode(encodedString: string): string {
    const binaryString = atob(encodedString);
    const binaryView = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
        binaryView[i] = binaryString.charCodeAt(i);
    }

    const utf8Decoder = new TextDecoder();
    return utf8Decoder.decode(binaryView);
}

export {
    base64Decode,
    base64Encode
}
