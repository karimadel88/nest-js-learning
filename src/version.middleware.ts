import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class VersionMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction) {
    res.locals.version = "1.0.0"; // Your version information
    const originalJson = res.json;
    res.json = function (body) {
      if (typeof body === "object")
        body = { ...body, version: res.locals.version };
      return originalJson.call(this, body);
    };
    next();
  }
}
