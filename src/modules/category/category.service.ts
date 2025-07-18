import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryService {
    getAll(): string {
        return "This is the Category Service response";
    }

    getById(id: string): Object {
        return new Object();
    }

    create(): void {
        // Logic to create a category
    }

    update(id: string): void {
        // Logic to update a category
    }

    delete(id: string): void {
        // Logic to delete a category
    }
}