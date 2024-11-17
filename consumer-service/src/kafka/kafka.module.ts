import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [ProductsModule], 
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
