import { registerAs } from "@nestjs/config";

export enum ConfigKeys {
    App = "App",
    Db = "Db",
    Jwt = "Jwt",
    Encryption = "Encryption"
}

const AppConfig = registerAs(ConfigKeys.App, () => ({
    port: 3000,
}))

const JwtConfig = registerAs(ConfigKeys.Jwt, () => ({
    accessTokenSecret: process.env.ACCESS_TOKEN,
    refreshTokenSecret: process.env.REFRESH_TOKEN,
}))

const EncryptionConfig = registerAs(ConfigKeys.Encryption, () => ({
    secretKey: process.env.SECRET_KEY,
    iv: process.env.IV
}))

const DbConfig = registerAs(ConfigKeys.Db, () => ({
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "abolfazljzk",
    database: "auth-otp"
}))


export const configurations = [AppConfig, DbConfig, JwtConfig, EncryptionConfig]