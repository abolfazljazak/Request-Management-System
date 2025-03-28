import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
  App = "App",
  Db = "Db",
  Jwt = "Jwt",
  Encryption = "Encryption",
  Zippo = "Zippo",
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
  port: process.env.PORT || 3000,
}));

const ZippoConfig = registerAs(ConfigKeys.Zippo, () => ({
  apiUrl: process.env.ZIPPO_API_URL || 'http://localhost:3000',
}));

const JwtConfig = registerAs(ConfigKeys.Jwt, () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN || 'defaultAccessTokenSecret',
  expire: process.env.EXPIRE || '3600',
}));

const EncryptionConfig = registerAs(ConfigKeys.Encryption, () => ({
  secretKey: process.env.ENCRYPTION_KEY || 'defaultSecretKey',
  iv: process.env.ENCRYPTION_IV || 'defaultIv',
}));

const DbConfig = registerAs(ConfigKeys.Db, () => ({
  port: process.env.DB_PORT || '5432',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb',
}));

export const configurations = [AppConfig, DbConfig, JwtConfig, EncryptionConfig, ZippoConfig];
