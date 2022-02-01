import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SideBarComponent } from './components/chat_interfaces/side-bar/side-bar.component';
import { MainInterfaceComponent } from './components/chat_interfaces/main-interface/main-interface.component';
import { AdditionalSideBarComponent } from './components/chat_interfaces/additional-side-bar/additional-side-bar.component';
import { ContentInterfaceComponent } from './components/chat_interfaces/content-interface/content-interface.component';
import { ChatComponentComponent } from './components/chat-component/chat-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { DirectChatContainerComponent } from './components/direct-chat-container/direct-chat-container.component';
import { ChatRoomContainerComponent } from './components/chat-room-container/chat-room-container.component';
import { CreateRoomFormComponent } from './components/create-room-form/create-room-form.component';
import { authInterceptorProviders } from './interceptors/jwt-interceptor.interceptor';
import { FilesizePipe } from './pipes/filesize.pipe';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { TimeStampPipe } from './pipes/time-stamp.pipe';
import { MenuBuilderComponent } from './components/menu-builder/menu-builder.component';
import { UrlPipe } from './pipes/url.pipe';

import { TestComponent } from './components/test/test.component';
import { ScrollableDirective } from './directive/scrollable.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SettingsComponent } from './components/settings/settings.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { NgVarDirective } from './directive/ng-var.directive';
import { MessageDropDownComponent } from './components/message-drop-down/message-drop-down.component';
import { ChatroomDropDownComponent } from './components/chatroom-drop-down/chatroom-drop-down.component';
import { ConfirmationDialogueComponent } from './components/confirmation-dialogue/confirmation-dialogue.component';
import { FreindsPageComponent } from './components/freinds-page/freinds-page.component';
import { UserDropDownComponent } from './components/user-drop-down/user-drop-down.component';
import { CurrentUserDropdownComponent } from './components/current-user-dropdown/current-user-dropdown.component';
import { FriendContainerComponent } from './components/friend-container/friend-container.component';
import { PrivateChatroomComponent } from './components/private-chatroom/private-chatroom.component';
import { MessageFormatterPipe } from './pipe/message-formatter.pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { InviteComponentComponent } from './components/invite-component/invite-component.component';
import { EmbedsContainerComponent } from './comonents/embeds-container/embeds-container.component';
import { InviteEmbedComponent } from './comonents/invite-embed/invite-embed.component';
import { YoutubeEmbedComponent } from './components/youtube-embed/youtube-embed.component';
import { SafePipe } from './pipes/safe.pipe';
import { TwitchEmbedComponent } from './components/twitch-embed/twitch-embed.component';
import { FriendMainContainerComponent } from './components/friend-main-container/friend-main-container.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SideBarComponent,
    MainInterfaceComponent,
    AdditionalSideBarComponent,
    ContentInterfaceComponent,
    ChatComponentComponent,
    AlertComponent,
    DirectChatContainerComponent,
    ChatRoomContainerComponent,
    CreateRoomFormComponent,
    FilesizePipe,
    AudioPlayerComponent,
    TimeStampPipe,
    MenuBuilderComponent,
    UrlPipe,
    TestComponent,
    ScrollableDirective,
    SpinnerComponent,
    SettingsComponent,
    UserSettingsComponent,
    NgVarDirective,
    MessageDropDownComponent,
    ChatroomDropDownComponent,
    ConfirmationDialogueComponent,
    FreindsPageComponent,
    UserDropDownComponent,
    CurrentUserDropdownComponent,
    FriendContainerComponent,
    PrivateChatroomComponent,
    MessageFormatterPipe,
    InviteComponentComponent,
    EmbedsContainerComponent,
    InviteEmbedComponent,
    YoutubeEmbedComponent,
    SafePipe,
    TwitchEmbedComponent,
    FriendMainContainerComponent,
    SplashScreenComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    BrowserAnimationsModule
  
   

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
