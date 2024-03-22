import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { DtoInterface } from "./dto.interface";

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: DtoInterface<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before...");

    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
