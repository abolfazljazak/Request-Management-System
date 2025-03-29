import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const getUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const httpContext = context.switchToHttp();
  const request = httpContext.getRequest();
  return request.user;
});
