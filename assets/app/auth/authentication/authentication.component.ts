import { Component } from "@angular/core"
import { UserService } from "../../service/user.services";

@Component({
    selector: 'app-authentication',
    templateUrl: './authentication-component.html',
    providers: [UserService]
})


export class AuthenticationComponent {
    pageAuth= "signin";
    constructor(private userService: UserService) {

        
     }

    
    isLoggedIn() {
        return this.userService.isLoggedIn()
    }

    cahangeAuthPage(_signupPage){
        this.pageAuth = _signupPage;
    }

    isSigninPage ()
    {
        return this.pageAuth == "signin";
    }


}