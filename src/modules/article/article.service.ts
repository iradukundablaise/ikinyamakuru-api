import { Injectable } from "@nestjs/common";
import { Article } from "generated/prisma";
import { PrismaService } from "src/prisma.service";
import { ArticleDto } from "./article.dto";

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) {}

    async getAll(): Promise<Article[]> {
        return this.prismaService.article.findMany();
    }

    async getById(id: number): Promise<Article | null> {
        return this.prismaService.article.findUnique({
            where: { id }
        });
    }

    async create(article: ArticleDto): Promise<Article | null> {
        // Logic to create an article
        let category= await this.prismaService.category.findFirst({
            where: { name: article.category }
        });


        let source = await this.prismaService.source.findFirst({
            where: { name: article.source }
        });

        if (!category) {
            throw new Error("Category not found");
        }

        if (!source) {
            throw new Error("Source not found");
        }

        return this.prismaService.article.create({
            data: {
                title: article.title,
                slug: article.slug,
                summary: article.summary,
                publishedAt: article.publishedAt,
                url: article.url,
                categoryId: category.id ,
                sourceId: source.id,
                createdAt: new Date(),
                updatedAt: new Date()
            }   
        });
    }

    async update(id: string): Promise<void> {
        // Logic to update an article

    }

    async delete(id: number): Promise<Article | null> {
        // Logic to delete an article
        return this.prismaService.article.delete({
            where: { id }
        });
    }
}