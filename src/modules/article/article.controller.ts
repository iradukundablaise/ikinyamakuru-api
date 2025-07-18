import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { Article } from "generated/prisma";
import { ArticleDto } from "./article.dto";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get("/")
    async findAll(page: number = 1, perPage: number = 20): Promise<Object[]> {
        return this.articleService.getAll();
    }

    @Get("/:id")
    async findOneById(@Param('id') id: number): Promise<Article | null> {
        return this.articleService.getById(id);
    }

    @Post("/")
    create(@Body() article: ArticleDto): void {
        this.articleService.create(article);
    }

    @Put("/:id")
    update(id: string): void {
        this.articleService.update(id);
    }

    @Delete("/:id")
    remove(@Param('id') id: number): void {
        this.articleService.delete(id);
    }
}