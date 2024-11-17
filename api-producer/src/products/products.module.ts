import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product]),KafkaModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
