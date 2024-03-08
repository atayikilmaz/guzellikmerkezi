import CryptoJS, { AES, enc } from "crypto-js";

const SECRET_KEY = 'derma2**3';

// Base64 URL-safe characters
const base64UrlChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

// Encrypt function using AES
export function hashData(data: string): string {
  const encryptedValue = AES.encrypt(data, SECRET_KEY).toString();
  const base64Encoded = enc.Base64.stringify(enc.Utf8.parse(encryptedValue));
  const urlSafeHash = base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return urlSafeHash;
}

// Decrypt function using AES
export function decodeHash(encryptedValue: string): string {
  const base64Encoded = encryptedValue.replace(/-/g, '+').replace(/_/g, '/');
  const base64Decoded = enc.Base64.parse(base64Encoded).toString(enc.Utf8); // Convert WordArray to string
  const decryptedValue = AES.decrypt(base64Decoded, SECRET_KEY, { format: CryptoJS.format.OpenSSL }).toString(enc.Utf8);
  return decryptedValue;
}

// Create a token using the appointment ID
export function createToken(appointmentId: number): string {
  const encryptedToken = hashData(String(appointmentId));
  return encryptedToken;
}

// Verify token (decrypt) using the appointment ID
export function verifyToken(encryptedToken: string): number | null {
  try {
    const decryptedValue = decodeHash(encryptedToken);
    const appointmentId = parseInt(decryptedValue, 10);
    return appointmentId;
  } catch (error) {
    return null; // Token decryption failed
  }
}
