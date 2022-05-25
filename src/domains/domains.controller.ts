import { Body, Controller, Get, Param, Post ,Delete } from '@nestjs/common';
import { get } from 'http';
import { json } from 'stream/consumers';
import { DomainsService } from './domains.service';

@Controller('domains')
export class DomainsController {
    constructor(private domains:DomainsService){}

@Get()
getAllDomains(){

    return this.domains.findAll();

}

@Get(':domain')
getByDomain(@Param('domain') domain : string){

    return this.domains.findOne(domain);
}




@Post('add')
createDomain(@Body() data : any){
    return this.domains.add(data);
}


@Delete(':domain')
deleteDomain(@Param('domain') domain : string){

    return this.domains.delete(domain);
}



}
