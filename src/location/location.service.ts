import { Injectable } from '@nestjs/common';
import { PrismaAppService } from 'src/prisma/prisma.app.service';
import { CreateLocationInput } from './dto/create-location.input';
import { UpdateLocationInput } from './dto/update-location.input';

@Injectable()
export class LocationService {
  constructor(private readonly prismaAppService: PrismaAppService) { }
  create(createLocationInput: CreateLocationInput) {
    return this.prismaAppService.prismaService.location.create({
      data: createLocationInput
    });
  }

  findAll() {
    return this.prismaAppService.prismaService.location.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} location`;
  }

  update(id: string, updateLocationInput: UpdateLocationInput) {
    return `This action updates a #${id} location`;
  }

  remove(id: string) {
    return `This action removes a #${id} location`;
  }
}
