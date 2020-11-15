import { Component } from "@angular/core"
import { UserService } from "../service/user.services";
import { Router } from '@angular/router'


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    providers: [UserService],
})
export class HeaderComponent {
    constructor(private userService: UserService,private router: Router) { }

    isLoggedIn() {
        return this.userService.isLoggedIn()
    }


    onLogout() {
        if (this.userService.isLoggedIn()) {
            this.userService.logOut()
            this.router.navigate(['./autenticacao/signin'])
        } else {
            alert("You are not signed in!")
        }
    }
}