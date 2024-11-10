import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class UtilService{
    isEmail(email: string){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}