import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from "./app.component"
import { MessageListComponent } from "./messages/message-list/message-list.component"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { MessageInputComponent } from './messages/message-input/message-input-component'
import { MessageComponent } from './messages/message-list-item/message.component'
import { MessagesComponent } from './messages/messages.component'
import { AuthenticationComponent } from './auth/authentication/authentication.component'
import { HeaderComponent } from './header/header.component'
import { myrouting } from './app.routing'
import { SigninComponent } from './auth/singin/signin.component'
import { SignupComponent } from './auth/signup/signup.component'
import { HttpModule } from '@angular/http'

@NgModule({
    declarations: [
        AppComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        MessageComponent,
        AuthenticationComponent,
        HeaderComponent,
        SigninComponent,
        SignupComponent,
        
    ],
    imports: [BrowserModule, FormsModule, myrouting, ReactiveFormsModule, HttpModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}