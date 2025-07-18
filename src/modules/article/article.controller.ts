import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ArticleService } from "./article.service";

@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get("/")
    findAll(page: number = 1, perPage: number = 20): string {
        return "";
    }

    @Get("/:id")
    findOneById(id: string): Object {
        return this.articleService.getById(id);
    }

    @Post("/")
    create(): void {
        this.articleService.create();
    }

    @Put("/:id")
    update(id: string): void {
        this.articleService.update(id);
    }

    @Delete("/:id")
    remove(id: string): void {
        this.articleService.delete(id);
    }
}