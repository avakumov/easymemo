import { Injectable, Scope, Inject } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { RequestExtended } from "src/entities/request";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private request: RequestExtended
  ) {}

  create(c: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        name: c.name,
        owner: {
          connect: {
            id: c.ownerId,
          },
        },
      },
    });
  }

  findAll() {
    const { userId, isAdmin } = this.request.user;
    const where = isAdmin ? null : { where: { ownerId: userId } };

    return this.prisma.category.findMany({
      ...where,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: { id },
    });
  }
}
