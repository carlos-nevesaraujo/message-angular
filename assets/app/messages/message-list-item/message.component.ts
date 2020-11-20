import { Component, Input, Output } from "@angular/core"
import { Message } from "../../models/message.model"
import { MessageService } from "../../service/message.services"

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
})
export class MessageComponent {

    @Input() message: Message

    constructor(private messageService: MessageService) { }

    onEdit() {
        this.messageService.setMessageToEdit(this.message)
    }

    onDelete() {
      
            this.messageService.deleteMessage(this.message).subscribe(
                successData => console.log(successData),
                errorData => console.log(errorData)
            )
        
    }
}