import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService{

    userLoggedIn = false;
    error = "";
    message = "";

    resetError(time: number = 8000){
        setTimeout(()=>{
            this.error = "";
        },time)
    }

    resetMessage(time: number = 8000){
        setTimeout(()=>{
            this.message = "";
        },time)
    }

    async registerUser(name: string, email: string, password: string){

        const response = await fetch(`${environment.apiUrl}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();
        
        if(data.success){
            this.message = data.info;
            this.resetMessage();
            return true;
        }else{
            this.error = data.error;
            this.resetError();
            return false;
        }
        
    }

    async loginUser(email: string, password: string){

        const response = await fetch(`${environment.apiUrl}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const data = await response.json();

        if(data.success){
            this.userLoggedIn = true;
            this.message = data.info;
            localStorage.setItem("auth-token", data.token);
            this.resetMessage();
            return true;
        }else{
            this.error = data.error;
            this.resetError();
            return false;
        }
    }

    logoutUser(){
        this.userLoggedIn = false;
        this.message = "";
        localStorage.removeItem("auth-token");
    }

    async verifyUser(){
        const response = await fetch(`${environment.apiUrl}/api/auth/verify`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`
            }
        })

        const data = await response.json();
        console.log(data);
        console.log(localStorage.getItem("auth-token"));
        if(data.success){
            this.userLoggedIn = true;
        }else{
            this.userLoggedIn = false;
            localStorage.removeItem("auth-token");
        }
    }
}