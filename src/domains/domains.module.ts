import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { DomainsController } from './domains.controller';
import { DomainsService } from './domains.service';

@Module({
  imports:[    
    HttpModule.register({
    timeout: 5000,
    maxRedirects: 5,
  }),
],
  controllers:[DomainsController],
  providers: [DomainsService]
})
export class DomainsModule {}
