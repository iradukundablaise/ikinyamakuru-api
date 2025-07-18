import { Get, Post, Put, Delete, Controller } from "@nestjs/common";

@Controller('categories')
export class CategoryController {
    constructor() {}

    @Get("/")
    findAll(page: number = 1, perPage: number = 20): string {
        return "";
    }

    @Get("/:id")
    findOneById(id: string): void {
        
    }

    @Post("/")
    create(): void {
        
    }

    @Put("/:id")
    update(id: string): void {
    }

    @Delete("/:id")
    remove(id: string): void {
    }
}