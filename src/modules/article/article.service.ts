import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) {}

    async getAll(): Promise<Object[]> {
        return this.prismaService.article.findMany();
    }

    getById(id: string): Object{
        return new Object();
    }

    create(): void {
        // Logic to create an article
    }

    update(id: string): void {
        // Logic to update an article
    }

    delete(id: string): void {
        // Logic to delete an article
    }
}