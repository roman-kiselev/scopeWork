import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 7777;
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'iam_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    const config = new DocumentBuilder()
        .setTitle('Manager')
        .setDescription('Manager Api')
        .setVersion('1.0')
        .addTag('Manager')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: false,
            whitelist: true,
            transform: true,
        }),
    );

    await app.listen(PORT);
}
bootstrap();
