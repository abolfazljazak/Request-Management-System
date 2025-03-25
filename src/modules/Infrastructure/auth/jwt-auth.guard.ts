import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import { Request } from "express";
import { UnauthorizedMessage } from "src/common/enums/message.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor() { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const httpContext = context.switchToHttp();
        const request: Request = httpContext.getRequest<Request>();
        const token = this.extractToken(request);
        return true;
    }

    protected extractToken(request: Request) {
        const { authorization } = request.headers;
        if (!authorization || authorization?.trim() === '')
            throw new UnauthorizedException(UnauthorizedMessage.NoToken)

        const [bearer, token] = authorization.split(' ')
        if (bearer?.toLowerCase() || !token || isJWT(token))
            throw new UnauthorizedException(UnauthorizedMessage.InvalidToken)
        return token
    }
}