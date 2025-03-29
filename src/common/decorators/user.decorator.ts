import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const getUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const httpContext = context.switchToHttp();
  const request = httpContext.getRequest();
  return request.user;
});
