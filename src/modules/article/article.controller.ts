import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./article.dto";
import { ControllerResponse } from "src/common/types/controller-response.type";
import { Article } from "generated/prisma";


@Controller('articles')
export class ArticleController {

    constructor(private readonly articleService: ArticleService) {}

    @Get('/')
    async getAll(
        @Query('page') page: string, 
        @Query('perPage') perPage: string
    ): Promise<ControllerResponse<Article[]>> {
        try {
            
            const pageNumber = parseInt(page, 10) || 1;
            const perPageNumber = parseInt(perPage, 10) || 10;

            const articles = await this.articleService.getAll(pageNumber, perPageNumber);
            return {
                page: pageNumber,
                perPage: perPageNumber,
                count: articles.length,
                data: articles,
                statusCode: 200
            };
        }catch (error) {
            return {
                error: error.message,
                statusCode: 500
            };
        }
    }
    
    @Get('/:id')
    async getOneById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ControllerResponse<Article>> {
        try {
            const article = await this.articleService.getById(id);
            if (!article) {
                return {
                    error: "Article not found",
                    statusCode: 404
                };
            }
            return {
                data: article,
                statusCode: 200
            };
        } catch (error) {
            return {
                error: error.message,
                statusCode: 500
            };
        }
    }

    @Post('/')
    async create(@Body() articleDto: ArticleDto): Promise<ControllerResponse<Article>> {
        let article: Article | null = await this.articleService.create(articleDto);

        if (!article) {
            return {
                error: "Failed to create article",
                statusCode: 500
            };
        }
        return {
            data: article,
            statusCode: 201
        };
    }


    @Put('/:id')
    async update(
        @Param('id', ParseIntPipe) id: number
    ){

    }

    @Delete('/:id')
    async delete(
        @Param('id', ParseIntPipe) id: number
    ){

    }
}