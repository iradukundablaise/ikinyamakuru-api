import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleDto } from "./article.dto";


@Controller('articles')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get('/')
    async getAll(@Param('page', ParseIntPipe) page: number = 1, @Param('perPage', ParseIntPipe) perPage: number){}
    
    @Get('/:id')
    async getOneById(@Param('id', ParseIntPipe) id: number){}

    @Post('/')
    async create(@Body() articleDto: ArticleDto){}

    @Put('/:id')
    async update(@Param('id', ParseIntPipe) id: number){}

    @Delete('/:id')
    async delete(@Param('id', ParseIntPipe) id: number){}
}