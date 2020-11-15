export class User {
    email: string
    password: string
    firstName: string
    lastName: string
    user_id: string
    profissao:string
    sexo:string

    constructor(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        profissao: string,
        sexo: string,
        user_id: string = null) {
        this.email = email
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.profissao = profissao
        this.sexo = sexo
        this.user_id = user_id
    }
}