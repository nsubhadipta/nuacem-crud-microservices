import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';

@Injectable()
export class ProductsService {
  private products = [];

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Keep the in-memory implementation for creating a product
  create(product: CreateProductDto) {
    const newProduct = { ...product };
    this.products.push(newProduct);
    return newProduct ;
  }

  // Use PostgreSQL for fetching all products
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Use PostgreSQL for updating a product
  async update(id: number, product: Partial<CreateProductDto>): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({ where: { id } });
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
    const updatedProduct = Object.assign(existingProduct, product);
    return await this.productRepository.save(updatedProduct);
  }

  // Use PostgreSQL for deleting a product
  async delete(id: number): Promise<string> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Product not found');
    }
    return 'Product deleted successfully';
  }
}
