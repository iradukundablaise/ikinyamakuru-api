import { Injectable } from "@nestjs/common";
import { Article } from "generated/prisma";
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

    async bulkCreate(articles: ArticleDto[]): Promise<{ count: number }> {
        // Fetch all categories and sources once
        const categories = await this.prismaService.category.findMany({
            select: { id: true, slug: true }
        });
        const sources = await this.prismaService.source.findMany({
            select: { id: true, name: true }
        });

        // create maps for categories slags and source names
        const categoryMap = Object.fromEntries(categories.map(cat => [cat.slug, cat.id]));
        const sourceMap = Object.fromEntries(sources.map(src => [src.name, src.id]));

        // Map articles to include categoryId and sourceId
        const data = articles.map(article => {
            const categoryId = categoryMap[article.category];
            const sourceId = sourceMap[article.source];

            if (!categoryId) throw new Error(`Category not found: ${article.category}`);
            if (!sourceId) throw new Error(`Source not found: ${article.source}`);

            return {
                title: article.title,
                slug: article.slug,
                summary: article.summary,
                publishedAt: article.publishedAt,
                url: article.url,
                categoryId,
                sourceId,
                createdAt: new Date(),
                updatedAt: new Date()
            };
        });

        return this.prismaService.article.createMany({ data });
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