import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);
  private kafka = new Kafka({
    clientId: 'api-gateway',
    brokers: ['localhost:9092'],
  });

  private producer = this.kafka.producer();

  async onModuleInit() {
    await this.connectProducer();
  }

  async connectProducer() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka Producer connected');
    } catch (error) {
      this.logger.error('Error connecting Kafka Producer', error);
    }
  }

  async sendMessage(topic: string, message: any) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      this.logger.log(`Message sent to topic ${topic}`);
    } catch (error) {
      this.logger.error('Error sending message', error);
    }
  }
}
