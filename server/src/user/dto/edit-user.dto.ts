export class EditUserDto {
  readonly userId: string;
  readonly email: string;
  readonly password: string;
  readonly banned: boolean;
  readonly firstname: string;
  readonly lastname: string;
}
