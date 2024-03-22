import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Report } from "./reports/entities/report.entity";
import { ReportsModule } from "./reports/reports.module";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { VersionMiddleware } from "./version.middleware";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      database: "cvDB",
      port: 5432,
      username: "postgres",
      password: "root",
      host: "localhost",
      entities: [User, Report],
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VersionMiddleware).forRoutes("*");
  }
}
