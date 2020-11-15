import { Message } from "../models/message.model"
import { Http, Response, Headers } from '@angular/http'
import { Injectable, EventEmitter } from "@angular/core"
import 'rxjs/Rx'
import { Observable } from 'rxjs'

@Injectable()
export class MessageService {
    private routePrefix : string = "http://localhost:3000/api/message/";

    private messages: Message[] = []

    messageIsEdit = new EventEmitter<Message>()

    constructor(private http: Http) { }

    addMessage(message: Message) {
        const body = JSON.stringify(message)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return (
            this.http.post(this.routePrefix, body, { headers })
                .map((response: Response) => {
                    const responseJson = response.json()
                    message.setId(responseJson.objResult._id);
                    this.messages.push(message)

                    return responseJson
                })
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }

    getMessages() {
        return (
            this.http.get(this.routePrefix)
                .map((response: Response) => {
                    const jsonResponse = response.json()
                    const receivedMessages = jsonResponse.objResult
                    const transformedMessages = receivedMessages.map(msg =>
                        {
                        return new Message(msg.content,msg.username, msg._id, msg.userId)
                    })
                    this.messages = transformedMessages

                    return this.messages
                })
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }

    setMessageToEdit(message: Message) {
        this.messageIsEdit.emit(message)
    }

    updateMessage(message: Message) {
        this.messages[this.messages.indexOf(message)].setData(message.content)
        const body = JSON.stringify(message)
        const headers = new Headers({ 'Content-Type': 'application/json' })
        return (
            this.http.patch(this.routePrefix + message.messageId, body, { headers })
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        return (
            this.http.delete(this.routePrefix + message.messageId)
                .map((response: Response) => response.json())
                .catch((error: Response) => Observable.throw(error.json()))
        )
    }
}