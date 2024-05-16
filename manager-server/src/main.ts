import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filters/http.exception-filter';

async function bootstrap() {
    const PORT = process.env.PORT || 4001;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://localhost:5672'],
            queue: 'manager_queue',
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
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            disableErrorMessages: false,
            transform: true,
        }),
    );

    app.useGlobalFilters(new HttpExceptionFilter());

    await app.startAllMicroservices();
    await app.listen(PORT, () => {
        // console.log(`Manager_server listening on port ${PORT}`);
    });
}
bootstrap();
