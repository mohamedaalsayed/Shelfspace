import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Item, ReadingStatus, Prisma } from '@prisma/client';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async item(
    itemWhereUniqueInput: Prisma.ItemWhereUniqueInput,
  ): Promise<Item | null> {
    return this.prisma.item.findUnique({
      where: itemWhereUniqueInput,
    });
  }

  async items(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ItemWhereUniqueInput;
    where?: Prisma.ItemWhereInput;
    orderBy?: Prisma.ItemOrderByWithRelationInput;
  }): Promise<Item[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.item.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async userItems(userId: number): Promise<Item[]> {
    return this.items({ 
      where: { userId }
    })
  }

  async checkItemByTitle(title: string): Promise<Boolean> {
    const exists = await this.prisma.item.count({
      where: { title }
    });

    return exists > 0;
  }

  async checkUserItemByTitle(userId: number, title: string): Promise<Boolean> {
    const exists = await this.prisma.item.count({
      where: {
        userId,
        title
      }
    })
    return exists > 0;
  }

  async createItem(data: CreateItemDto): Promise<Item> {
    if (await this.checkUserItemByTitle(data.userId, data.title)) {
      throw new ConflictException("There is an item with this title")
    }
    const { userId, ...itemData } = data;
    const now: Date = new Date();

    return this.prisma.item.create({
      data: {
        ...itemData,
        addedAt: now,
        status: ReadingStatus.NOT_STARTED,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async updateItem(params: {
    where: Prisma.ItemWhereUniqueInput;
    data: Prisma.ItemUpdateInput;
  }): Promise<Item> {
    const { where, data } = params;
    return this.prisma.item.update({
      data,
      where,
    });
  }

  async deleteItem(where: Prisma.ItemWhereUniqueInput): Promise<Item> {
    return this.prisma.item.delete({
      where,
    });
  }
}
