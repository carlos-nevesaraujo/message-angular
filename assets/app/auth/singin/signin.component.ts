import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../../service/user.services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-logout',
    templateUrl: './signin-component.html'
})
export class SigninComponent implements OnInit {
    myForm: FormGroup

    constructor(private userService: UserService, private router: Router) { }

    onSubmit() {

        if (this.userService.isLoggedIn()) {
            this.router.navigate(['./autenticacao/logout'])
        } else {
            this.userService.signIn(
                this.myForm.value.emailInput,
                this.myForm.value.passwordInput
            ).subscribe(
                successData => {
                    alert("Sucesso!")
                    this.router.navigate(['./mensagens'])
                },
                errorData => alert("Erro ao logar usuário")
            )
        }
        this.myForm.reset()
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            emailInput: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")]),
            passwordInput: new FormControl(null, Validators.required),
        })
        if (this.userService.isLoggedIn()) {
            this.router.navigate(['./autenticacao/logout'])
        }
    }
}