import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../service/message.services";
import { Message } from "../../models/message.model";
import { NgForm } from "@angular/forms";
import { UserService } from "../../service/user.services";

@Component({
    selector: "app-message-input",
    templateUrl: "./message-input.component.html",
})

export class MessageInputComponent implements OnInit {
    constructor(private messageService: MessageService, private userService: UserService) { }

    message: Message

    ngOnInit() {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        )
    }

    onSubmit(form: NgForm) {
        const currentUser = this.userService.getLoggedUser();

        if (this.message) {
            //Editar
            this.message.content = form.value.myContent
            this.message.user = currentUser.user_id,
            this.messageService
                .updateMessage(this.message,currentUser)
                .subscribe(
                    successData => alert(successData.msg),
                    errorData => alert(errorData.errorTitle)
                )
            this.message = null
        } else {
            //Criar
            const message = new Message(
                form.value.myContent,
                null,
                currentUser.user_id
            )
            this.messageService
                .addMessage(message,currentUser)
                .subscribe(
                    successData => alert(successData.msg),
                    errorData => alert(errorData.errorTitle)
                )
        }
        form.resetForm()
    }

}

