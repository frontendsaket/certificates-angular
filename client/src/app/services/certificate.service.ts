import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Certificate } from "../app.types";


@Injectable({providedIn: 'root'})
export class CertificateService{
    emptyCertificate = {
        title: "",
        description: "",
        image: "",
        recipient: "",
        _id: ""
    } as Certificate;
    isLoading = false;
    message = "";
    certificates: Certificate[] = [];
    activeCertificate: Certificate = this.emptyCertificate;
    

    async getAllCertificates(token: string){
        try{
            this.isLoading = true;;
            const response = await fetch(`${environment.apiUrl}/api/certificate/all`, {
                headers: {
                    "auth-token": token
                }
            });
            const data = await response.json();
            if(data.success){
                this.certificates = data.certificates;
                this.isLoading = false;
                return this.certificates;
            }else{
                this.message = "Unable to fetch certificates";
                this.isLoading = false;
            }
            return [];
        }catch(error){
            console.error(error);
            return [];
        }
    }

    async getCertificateById(id: string){
        try{
            this.isLoading = true;
            const response = await fetch(`${environment.apiUrl}/api/certificate/get/${id}`);
            const data = await response.json();
            if(data.success){
                this.activeCertificate = data.certificate;
                return this.activeCertificate;
            }else{
                this.message = "Unable to fetch certificate";
                this.isLoading = false;
            }
            return this.emptyCertificate;
        }catch(error){
            console.error(error);
            return this.emptyCertificate;
        }
    }
}