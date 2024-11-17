import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>) {
    try {
      const product = this.productsRepository.create(productData);
      await this.productsRepository.save(product);
      this.logger.log(`Product saved: ${product.name}`);
    } catch (error) {
      this.logger.error('Error saving product', error.stack);
    }
  }
}
