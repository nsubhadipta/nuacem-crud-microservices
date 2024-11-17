import { Controller, Get, Post, Put, Delete, Body, Param, Logger } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { KafkaService } from '../kafka/kafka.service';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = this.productsService.create(createProductDto);
      await this.kafkaService.sendMessage('product_created', product);
      return product;
    } catch (error) {
      this.logger.error('Error creating product', error.stack);
      throw error;
    }
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProductDto: Partial<CreateProductDto>) {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (error) {
      this.logger.error('Error updating product', error.stack);
      throw error;
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    try {
      return this.productsService.delete(id);
    } catch (error) {
      this.logger.error('Error deleting product', error.stack);
      throw error;
    }
  }
}
