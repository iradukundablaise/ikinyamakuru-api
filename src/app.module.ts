import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { SourceModule } from './modules/source/source.module';

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    SourceModule
  ],
})
export class AppModule {}
