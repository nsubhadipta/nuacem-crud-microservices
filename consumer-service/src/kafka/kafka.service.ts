import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';
import { ProductsService } from '../products/products.service';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);
  private kafka = new Kafka({
    clientId: 'data-service',
    brokers: ['localhost:9092'],
  });

  private consumer = this.kafka.consumer({ groupId: 'data-service-group' });

  constructor(private readonly productsService: ProductsService) {}

  async onModuleInit() {
    await this.connectConsumer();
  }

  async connectConsumer() {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: 'product_created', fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          this.logger.log(`Received message: ${value}`);
          const product = JSON.parse(value);
          await this.productsService.create(product);
        },
      });
      this.logger.log('Kafka Consumer connected');
    } catch (error) {
      this.logger.error('Error connecting Kafka Consumer', error);
    }
  }
}
