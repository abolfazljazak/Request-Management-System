import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
    private algorithm = 'aes-256-cbc';
    private key: Buffer;
    private iv: Buffer;

    constructor(private readonly configService: ConfigService) {
        const secretKey = this.configService.get<string>("jwt.secretKey");
        const ivHex = this.configService.get<string>("Encryption.iv");
        
        if (!secretKey || !ivHex) {
            throw new Error('Missing encryption configuration');
        }
        
        this.key = Buffer.from(secretKey, 'utf8');
        this.iv = Buffer.from(ivHex, 'hex');
    }

    encrypt(text: string): string {
        const cipher = createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(encryptedText: string): string {
        const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}