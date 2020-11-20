export class Message {
    messageId: string
    content: string
    user: any

    constructor(
        content: string,
        messageId: string = undefined,
        user: any = undefined) {
        this.content = content
        this.messageId = messageId
        this.user = user
    }

    setData(content: string, user: any = this.user) {
        this.content = content
        this.user = user
    }

    setId(messageId:string, user:any)
    {
        this.user = user;
        this.messageId= messageId;
    }
}