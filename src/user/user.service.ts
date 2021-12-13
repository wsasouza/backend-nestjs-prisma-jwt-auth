import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcryptjs from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcryptjs.hash(createUserDto.password, 10),
    };

    const user = await this.prisma.user.create({ data });

    return {
      ...user,
      password: undefined,
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    users.map((user) => {
      user.password = undefined;
    });

    return users;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    return {
      ...user,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    return {
      ...user,
      password: undefined,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
