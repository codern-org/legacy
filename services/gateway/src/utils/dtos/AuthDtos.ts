import { IsAlphanumeric, IsEmail } from 'class-validator';

export class LoginDto {

  @IsEmail()
  email!: string;

  @IsAlphanumeric()
  password!: string;

}
