import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { RolesService } from './roles/roles.service';
import { TypeWorkService } from './type-work/type-work.service';
import { UnitService } from './unit/unit.service';
import { CreateUserAndDescription } from './user/dto/create-user-and-description.dto';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const microcervice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'scopework_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  const config = new DocumentBuilder()
    .setTitle('ScopeWork')
    .setDescription('ScopeWork Api')
    .setVersion('1.0')
    .addTag('ScopeWork')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  // Проверяем есть ли роль admin
  const rolesService = app.get(RolesService);
  const typeWorkService = app.get(TypeWorkService);
  const unitService = app.get(UnitService);
  const roleDto: CreateRoleDto = {
    name: 'admin',
    description: 'Администратор',
  };
  const roleUserDto: CreateRoleDto = {
    name: 'user',
    description: 'Пользователь',
  };
  const roleMasterDto: CreateRoleDto = {
    name: 'master',
    description: 'Мастер',
  };
  const roleDevDto: CreateRoleDto = {
    name: 'dev',
    description: 'Разработчик',
  };
  const roleManagerDto: CreateRoleDto = {
    name: 'manager',
    description: 'Менеджер',
  };
  const roleDriverDto: CreateRoleDto = {
    name: 'driver',
    description: 'Водитель',
  };
  await rolesService.createRole(roleDto);
  await rolesService.createRole(roleUserDto);
  await rolesService.createRole(roleMasterDto);
  await rolesService.createRole(roleDevDto);
  await rolesService.createRole(roleManagerDto);
  await rolesService.createRole(roleDriverDto);
  const authService = app.get(AuthService);
  // await typeWorkService.createTypeWork({
  //   name: 'АСКУЭ',
  //   description: 'Автоматизированная система',
  // });
  // await typeWorkService.createTypeWork({
  //   name: 'Водоснабжение',
  //   description: 'Водоснабжение',
  // });
  const adminDto: CreateUserAndDescription = {
    email: 'admin@admin.ru',
    password: 'admin',
    firstname: 'Админ',
    lastname: 'Админ',
  };

  await authService.registrationAdminWithDescription(adminDto);

  await app.startAllMicroservices();
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
bootstrap();
