import { User } from "../models/user.model"
import { Http, Response, Headers } from '@angular/http'
import { Injectable, EventEmitter } from "@angular/core"
import 'rxjs/Rx'
import { Observable } from 'rxjs'

@Injectable()
export class UserService {
    private routePrefix : string = "http://localhost:3000/api/user/";

    constructor(private http: Http) { }

    
    addUser(user: User) {
        const body = JSON.stringify(user)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return (
            this.http.post(this.routePrefix, body, { headers })
                .map((response: Response) => {
                    const responseJson = response.json()
                    return responseJson.objResult
                })
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }

    signIn(email: string, password: string) {
        const body = JSON.stringify({ email, password })
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return (
        this.http.post(this.routePrefix +'signin', body, { headers })
                .map((response: Response) => {
                    const responseJson = response.json()

                    const currentUser = new User(
                        responseJson.objResult.email,
                        responseJson.objResult.password,
                        responseJson.objResult.firstName,
                        responseJson.objResult.lastName,
                        responseJson.objResult.profissao,
                        responseJson.objResult.sexo,
                        responseJson.objResult._id,
                    )

                    localStorage.setItem("currentUser", JSON.stringify(currentUser))
                    
                    console.log(responseJson);

                    return responseJson;
                })
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }

    isLoggedIn(): boolean {
        return localStorage.getItem("currentUser") !== null
    }

    logOut(): void {
        localStorage.removeItem("currentUser")
    }

    getLoggedUser(): User {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        return currentUser
    }
}