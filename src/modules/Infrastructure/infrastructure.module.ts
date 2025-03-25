import { Module } from '@nestjs/common';
import { InfrastructureService } from './infrastructure.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        InfrastructureService,
        JwtService,
        ConfigService
    ],
    exports: [
        InfrastructureService,
        JwtService,
        ConfigService
    ]
})
export class InfrastructureModule { }
