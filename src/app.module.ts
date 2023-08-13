import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FilesModule } from "./modules/files/files.module";
import { PipesModule } from "./pipes/pipes.module";
import { ProductCategoriesModule } from "./modules/categories/product-categories/product-categories.module";
import { ProductsModule } from "./modules/products/products.module";
import { OrdersModule } from "./modules/orders/orders.module";
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UsersModule } from './modules/users/users.module';
import { AddressModule } from './modules/address/address.module';

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
    OrdersModule,
    AuthenticationModule,
    UsersModule,
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
