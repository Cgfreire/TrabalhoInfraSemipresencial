import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  img?: string;

  @ApiProperty({ required: false })
  userId?: number;
}
