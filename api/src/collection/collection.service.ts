import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Collection, Item, Prisma } from '@prisma/client';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { connect } from 'http2';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async collection(
    collectionWhereUniqueInput: Prisma.CollectionWhereUniqueInput,
  ): Promise<Collection | null> {
    return this.prisma.collection.findUnique({
      where: collectionWhereUniqueInput,
    });
  }

  async collections(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CollectionWhereUniqueInput;
    where?: Prisma.CollectionWhereInput;
    orderBy?: Prisma.CollectionOrderByWithRelationInput;
  }): Promise<Collection[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.collection.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCollection(data: CreateCollectionDto): Promise<Collection> {
    const { userId, ...collectionData } = data;

    return this.prisma.collection.create({
      data: {
        ...collectionData,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async addItem(itemId: string, collectionId: string) : Promise<Item> {
    return this.prisma.item.update({
      where: {id: itemId},
      data: {
        collections: {
          connect: {id: collectionId}
        }
      }
    })
  }

  async updateCollection(params: {
    where: Prisma.CollectionWhereUniqueInput;
    data: Prisma.CollectionUpdateInput;
  }): Promise<Collection> {
    const { where, data } = params;
    return this.prisma.collection.update({
      data,
      where,
    });
  }

  async deleteCollection(where: Prisma.CollectionWhereUniqueInput): Promise<Collection> {
    return this.prisma.collection.delete({
      where,
    });
  }
}
