import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FilesModule } from "./modules/files/files.module";
import { MailerService } from "./services/mailer/mailer.service";
import { PipesModule } from "./pipes/pipes.module";
import { ProductCategoriesModule } from "./modules/categories/product-categories/product-categories.module";
import { ProductsModule } from "./modules/products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    // MongooseModule.forRoot(
    //   "mongodb+srv://tapadmin:0Gc2w194y3qSX5Y7@tap-db-aa835569.mongo.ondigitalocean.com/tap?tls=true&authSource=admin&replicaSet=tap-db"
    // ),
    MongooseModule.forRoot("mongodb://127.0.0.1:27017", {
      dbName: "dailystore",
    }),
    ConfigModule,
    FilesModule,
    PipesModule,
    ProductCategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
  exports: [MailerService],
})
export class AppModule {}
