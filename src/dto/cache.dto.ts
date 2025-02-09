import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SaveCacheDto {
  @IsString({ message: 'Key must be a string' })
  @IsNotEmpty({ message: 'key must not be empty' })
  @Length(1, 10, { message: 'Key must be between 1 and 10 characters.' })
  key: string;

  @IsString({ message: 'Value must be a string.' })
  @IsNotEmpty({ message: 'Value cannot be empty.' })
  value: string;
}
