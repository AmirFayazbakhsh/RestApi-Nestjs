import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Observable } from 'rxjs';


@Injectable()
export class DomainsService {
  constructor(private httpService: HttpService) {}

    //getAll
    findAll(){
        const options = {
            method: 'GET',
            url : 'https://napi.arvancloud.com/cdn/4.0/domains',
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log(response.data);
            return response.data.data;
            
        }).catch(function(error){
            console.log(error);
            return error;
            
        });

        
    }

    //get data by domain
    findOne(domain){

        const options = {
            method: 'GET',
            url : 'https://napi.arvancloud.com/cdn/4.0/domains/' + domain,
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log(response.data);
            return response.data.data;
            
        }).catch(function(error){
            console.log(error);
            return error;
            
        });        

    }

    // add domain 
    add(data : any){

            const options = {
                method: 'POST',
                url : 'https://napi.arvancloud.com/cdn/4.0/domains/dns-service',
                data: {
                    
                    "domain": data.domain,
                    "domain_type": "full"
                    
                },
                headers:{
                    Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
                }
            };

            return axios.request(options).then(function(response){
                console.log(response.data);
                return "Domain created successfully";
                
            }).catch(function(reason: AxiosError){                
                if(reason.response!.status === 422){
                    console.log("This domain is already exist");
                    return "This domain is already exist";
                }
                if(reason.response!.status === 400){
                    console.log("Data is not suitable");
                    return "Data is not suitable";
                    
                }else{
                    console.log(reason.response);
                    return reason.response;
                }
                
                
            });

    }


    //delete domain
    async delete(domain){

        const data = await this.findOne(domain);
    
        const options = {
            method: 'DELETE',
            url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}`,
            data:{
                "id": data['id'],
            },
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        console.log(domain);
        


        return axios.request(options).then(function(response){
            console.log("Domain deleted successfully");
            return "Domain deleted successfully";

        }).catch(function(error){
            console.log(error);
            return error;
            
        });
        
    }


    // Set custom NS records for the domain
    // this option need Professional plan of arvan
    update(domain : string ,nsKeys : any){

        const options = {
            method: 'PUT',
            url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}/ns-keys`,
            data:{
                "ns_keys": [nsKeys.ns_keys[0],nsKeys.ns_keys[1]]
            },
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log(response.data);
            return "Domain updated successfully";
            
        }).catch(function(reason: AxiosError){                
            
            return reason.response.data;
            
        });

    }


    // async resetDomain(domain){

    //     const data = await this.findOne(domain);
    
    //     const options = {
    //         method: 'DELETE',
    //         url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}`,
    //         data:{
    //             "id": data['id'],
    //         },
    //         headers:{
    //             Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
    //         }
    //     };
        


    //     return axios.request(options).then(function(response){
    //         console.log("Domain deleted successfully");
    //         return "Domain deleted successfully";

    //     }).catch(function(error){
    //         console.log(error);
    //         return error;
            
    //     });
        
    // }



    //check activity
    activity(domain : string){
        const options = {
            method: 'GET',
            url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}/ns-keys/check`,
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log(response.data);
            if(response.data.data.ns_status === false){
                return "domain is not active";
            }else{
                return "domain is activated";
            }
            
        }).catch(function(reason: AxiosError){                
            
            return reason.response.data;
            
        });
    }


    // Set a custom record for using CNAME Setup
    //this option need Enterprise plan of arvan
    cnameSetup(domain : string,data : any){
        const options = {
            method: 'PUT',
            url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}/cname-setup/custom`,
            data:{
                "address": data.address,
            },
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log(response.data);
            return response.data;
            
        }).catch(function(reason: AxiosError){                
            
            return reason.response.data;
            
        });
        
    }


    //Reset the custom record of CNAME Setup to the default value
    //this option need Enterprise plan of arvan
    resetCnameSetup(domain){
    
        const options = {
            method: 'DELETE',
            url : `https://napi.arvancloud.com/cdn/4.0/domains/${domain}/cname-setup/custom`,
            headers:{
                Authorization : 'Apikey 00eab9db-87ba-5f0f-a2df-3295774a913c'
            }
        };

        return axios.request(options).then(function(response){
            console.log("cname setup reset");
            return "cname setup reset";

        }).catch(function(error){
            console.log(error);
            return error;
            
        });
        
    }



    

}
