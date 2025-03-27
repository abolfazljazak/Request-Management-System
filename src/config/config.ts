import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
  App = "App",
  Db = "Db",
  Jwt = "Jwt",
  Encryption = "Encryption",
  Zippo = "Zippo",
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
  port: 3000,
}));

const ZippoConfig = registerAs(ConfigKeys.Zippo, () => ({
  apiUrl: process.env.ZIPPO_API_URL,
}));

const JwtConfig = registerAs(ConfigKeys.Jwt, () => ({
  accessTokenSecret: process.env.ACCESS_TOKEN,
  expire: process.env.EXPIRE,
}));

const EncryptionConfig = registerAs(ConfigKeys.Encryption, () => ({
  secretKey: process.env.SECRET_KEY,
  iv: process.env.IV,
}));

const DbConfig = registerAs(ConfigKeys.Db, () => ({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}));

export const configurations = [AppConfig, DbConfig, JwtConfig, EncryptionConfig, ZippoConfig];
