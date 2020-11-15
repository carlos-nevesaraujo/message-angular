import { Component, OnInit } from "@angular/core";
import { MessageService } from "../service/message.services";
import { UserService } from "../service/user.services";
import { Router } from "@angular/router";

@Component({
    selector: "app-messages",
    template: `
    <div class="container">
        <div class="row">
            <app-message-input></app-message-input>
        </div>
        <div class="row">
            <app-message-list></app-message-list>
        </div>
    </div>
    `,
    providers: [MessageService, UserService],
})

export class MessagesComponent implements OnInit {
    constructor(private router: Router, private userService: UserService) { }

    ngOnInit() {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['./autenticacao/signin'])
        }
    }
}