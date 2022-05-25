import { HttpService } from '@nestjs/axios';
import { Injectable, Res } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { Observable } from 'rxjs';


@Injectable()
export class DomainsService {
  constructor(private httpService: HttpService) {}

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



    //find one domain
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
    

}
