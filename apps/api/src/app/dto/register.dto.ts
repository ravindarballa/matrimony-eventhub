import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsMobilePhone } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  // Supports global formats. 'any' allows any country format, or use 'en-IN' for India, 'en-US' for USA, etc.
  @IsMobilePhone(undefined, {}, { message: 'Please provide a valid mobile phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone!: string;

  @IsEnum(['Self', 'Parents', 'Sibling', 'Friend'])
  profileCreatedBy!: string;

  @IsEnum(['Male', 'Female'])
  gender!: string;
}
