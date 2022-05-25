import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaController } from './prisma/prisma.controller';
import { PrismaModule } from './prisma/prisma.module';
import { DomainsController } from './domains/domains.controller';
import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [PrismaModule, DomainsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
