import { UseInterceptors } from "@nestjs/common";
import { DtoInterface } from "./dto.interface";
import { SerializeInterceptor } from "./serialize.interceptor";

export function Serialize<T>(dto: DtoInterface<T>) {
  return UseInterceptors(new SerializeInterceptor<T>(dto));
}
