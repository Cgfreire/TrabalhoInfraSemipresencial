import { Module } from '@nestjs/common';
import { UsersModule } from './entities/users/users.module';
import { AuthModule } from './entities/auth/auth.module';
import { ProductsModule } from './entities/products/products.module';
import { PrismaService } from './database/prisma.service';
import { ProductsallModule } from './entities/productsall/productsall.module';
import { userssallModule } from './entities/userssall/userssall.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProductsModule,
    ProductsallModule,
    userssallModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
