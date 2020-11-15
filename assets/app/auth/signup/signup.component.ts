import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../../models/user.model";
import { UserService } from "../../service/user.services";
import { Router } from "@angular/router";

@Component({
    selector: 'app-logout',
    templateUrl: './signup-component.html'
})
export class SignupComponent implements OnInit {
    myForm: FormGroup

    constructor(private userService: UserService, private router: Router) { }

    onSubmit() {
        const user = new User(
            this.myForm.value.emailInput,
            this.myForm.value.passwordInput,
            this.myForm.value.firstNameInput,
            this.myForm.value.lastNameInput,
            this.myForm.value.profissaoDropDown,
            this.myForm.value.sexoRadio
        )

        console.log(user)

        this.userService.addUser(user).subscribe(
            successData => {

                // loga o usuario
                this.userService.signIn(
                    this.myForm.value.emailInput,
                    this.myForm.value.passwordInput
                ).subscribe(
                    successData2 => {
                        alert("Conta criada com sucesso!")
                        this.router.navigate(['./mensagens'])
                         this.myForm.reset()

                    },
                    errorData2 => alert("Erro ao logar usuário")

                )
            },
            errorData => alert(errorData.errorTitle)
        )

    }

    ngOnInit() {
        this.myForm = new FormGroup({
            firstNameInput: new FormControl(null, Validators.required),
            lastNameInput: new FormControl(null, Validators.required),
            emailInput: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")]),
            passwordInput: new FormControl(null, Validators.required),
            sexoRadio: new FormControl(null, Validators.required),
            profissaoDropDown: new FormControl("Estudante", Validators.required),
            checkAceiteTermos: new FormControl(null, Validators.required),
        })
    }
}