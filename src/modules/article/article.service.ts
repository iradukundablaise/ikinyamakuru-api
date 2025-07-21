import { Injectable } from "@nestjs/common";
import { Article } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { ArticleDto } from "./article.dto";
import slugify from "slugify";

@Injectable()
export class ArticleService {
    constructor(private prismaService: PrismaService) {}

    async getAll(page: number, perPage: number): Promise<Article[]> {
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
            where: { name: article.source },
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

    async bulkCreate(articles: ArticleDto[]): Promise<{ count: number }> {
        const categories = await this.prismaService.category.findMany({
            select: { id: true, name: true }
        });
        const sources = await this.prismaService.source.findMany({
            select: { id: true, name: true }
        });

        const categoryMap = Object.fromEntries(categories.map(cat => [cat.name, cat.id]));
        const sourceMap = Object.fromEntries(sources.map(src => [src.name, src.id]));

        let successCount = 0;

        for (const article of articles) {
            const categoryId = categoryMap[article.category];
            const sourceId = sourceMap[article.source];

            if (!categoryId) continue;
            if (!sourceId) continue;

            try {
                await this.prismaService.article.create({
                    data: {
                        title: article.title,
                        slug: article.slug,
                        summary: article.summary,
                        publishedAt: article.publishedAt,
                        url: article.url,
                        categoryId,
                        sourceId,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    }
                });
                successCount++;
            } catch (error) {
                // Ignore constraint errors and continue
                
            }
        }
        return { count: successCount };
    }

    async update(id: number, article: ArticleDto): Promise<Article | null> {
        // Find category and source by name
        const category = await this.prismaService.category.findFirst({
            where: { name: article.category }
        });
        const source = await this.prismaService.source.findFirst({
            where: { name: article.source }
        });

        if (!category) throw new Error("Category not found");
        if (!source) throw new Error("Source not found");

        return this.prismaService.article.update({
            where: { id },
            data: {
                title: article.title,
                slug: article.slug,
                summary: article.summary,
                publishedAt: article.publishedAt,
                url: article.url,
                categoryId: category.id,
                sourceId: source.id,
                updatedAt: new Date()
            }
        });
    }

    async delete(id: number): Promise<{ deleted: boolean }> {
        // Logic to delete an article
        await this.prismaService.article.delete({
            where: { id }
        });

        return { deleted: true };
    }
}