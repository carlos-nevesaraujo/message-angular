import { Component, OnInit } from "@angular/core"
import { Message } from "../../models/message.model"
import { MessageService } from "../../service/message.services"

@Component({
    selector: "app-message-list",
    templateUrl: "./message-list.component.html",
})

export class MessageListComponent implements OnInit {

    messages: Message[]

    constructor(private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.messageService
            .getMessages()
            .subscribe(
                (data: Message[]) => {
                    this.messages = data
                    console.log(data)
                },
                error => console.log(error)
            )
    }


    onEdit(message) {
        this.messageService.setMessageToEdit(message)
    }

    onDelete(message) {
      
            this.messageService.deleteMessage(message).subscribe(
                successData => console.log(successData),
                errorData => console.log(errorData)
            )
        
    }
}