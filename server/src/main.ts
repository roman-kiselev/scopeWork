import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AuthService } from './auth/auth.service';
import { CreateRoleDto } from './roles/dto/create-role.dto';
import { RolesService } from './roles/roles.service';
import { CreateUserDto } from './user/dto/create-user.dto';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
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
  const roleDto: CreateRoleDto = {
    name: 'admin',
    description: 'Администратор',
  };
  const roleUserDto: CreateRoleDto = {
    name: 'user',
    description: 'Пользователь',
  };
  await rolesService.createRole(roleDto);
  await rolesService.createRole(roleUserDto);
  const authService = app.get(AuthService);
  const adminDto: CreateUserDto = {
    login: 'admin',
    password: 'admin',
  };

  await authService.registrationAdmin(adminDto);
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
bootstrap();
