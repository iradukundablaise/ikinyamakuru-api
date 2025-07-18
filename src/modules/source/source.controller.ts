import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('sources')
export class SourceController {
    @Get("/")
    findAll(): string {
        return "List of sources";
    }

    @Get("/:id")
    findOneById(id: string): Object {
        return { id, name: "Source Name" };
    }

    @Post("/")
    create(): void {
        console.log("Source created");
    }

    @Put("/:id")
    update(id: string): void {
        console.log(`Source with id ${id} updated`);
    }

    @Delete("/:id")
    remove(id: string): void {
        console.log(`Source with id ${id} deleted`);
    }
}
