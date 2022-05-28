import { Body, Controller, Get, Param, Post ,Delete, Put } from '@nestjs/common';
import { get } from 'http';
import { json } from 'stream/consumers';
import { DomainsService } from './domains.service';

@Controller('domains')
export class DomainsController {
    constructor(private domains:DomainsService){}

//get all data
@Get()
getAllDomains(){
    return this.domains.findAll();
}

//get data by name
@Get(':domain')
getByDomain(@Param('domain') domain : string){

    return this.domains.findOne(domain);
}

// create domain
@Post('add')
createDomain(@Body() data : any){

    return this.domains.add(data);
}

//delete domain
@Delete(':domain')
deleteDomain(@Param('domain') domain : string){

    return this.domains.delete(domain);
}

// update domain ns_keys
@Put(':domain')
updateNsDomain(@Param('domain') domain : string, @Body() data : any){    
    return this.domains.update(domain,data);
}


// Reset custom Nameserver keys to the default values for the domain
@Delete('reset-domain/:domain')
resetDomain(@Param('domain') domain : string){
    return this.domains.resetDomain(domain);
}


//check domain activity
@Get('activity/:domain')
isActive(@Param('domain') domain : string){

    return this.domains.activity(domain);
}

// Set a custom record for using CNAME Setup
@Put('cname-setup/:domain')
cnameSetup(@Param('domain') domain : string , @Body() data : any){
    return this.domains.cnameSetup(domain,data);
}



//Reset the custom record of CNAME Setup to the default value
@Delete('reset-cname-setup/:domain')
resetCnameSetup(@Param('domain') domain : string){
    return this.domains.resetCnameSetup(domain);

}

// Convert domain setup to cname
@Post('convert-to-cname/:domain')
convertToCname(@Param('domain') domain : string){
    return this.domains.convertToCname(domain);
}


// Check Cname Setup to find whether domain is activated
@Get('check-cname-activity/:domain')
checkCnameForActivity(@Param('domain') domain : string){
    return this.domains.checkCnameForActivity(domain);
}

@Post('clone-config/:domain')
cloneConfig(@Param('domain') domain : string ,@Body() anotherDomain : any){    
    return this.domains.cloneConfig(domain,anotherDomain.from);
}




}
