import { Module } from '@nestjs/common';
import { ArticleModule } from './modules/article/article.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ArticleModule
  ],
})
export class AppModule {}
