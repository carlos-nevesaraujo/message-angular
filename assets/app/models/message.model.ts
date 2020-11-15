export class Message {
    messageId: string
    content: string
    userId: string
    username: string

    constructor(
        content: string,
        username: string,
        messageId: string = undefined,
        userId: string = undefined) {
        this.content = content
        this.username = username
        this.messageId = messageId
        this.userId = userId
    }

    setData(content: string, username: string = this.username) {
        this.content = content
        this.username = username
    }

    setId(messageId:string)
    {
        this.messageId= messageId;
    }
}