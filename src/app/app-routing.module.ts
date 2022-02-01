import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AudioPlayerComponent } from './components/audio-player/audio-player.component';
import { ChatComponentComponent } from './components/chat-component/chat-component.component';
import { AdditionalSideBarComponent } from './components/chat_interfaces/additional-side-bar/additional-side-bar.component';
import { MainInterfaceComponent } from './components/chat_interfaces/main-interface/main-interface.component';
import { FreindsPageComponent } from './components/freinds-page/freinds-page.component';
import { InviteComponentComponent } from './components/invite-component/invite-component.component';
import { PrivateChatroomComponent } from './components/private-chatroom/private-chatroom.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { TestComponent } from './components/test/test.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { SignedInGuard } from './guards/signed-in.guard';

const routes: Routes = [


  { path: 'signin', component: SignInComponent,data:{value:'signin'},canActivate:[SignedInGuard] },
  { path: 'signup', component: SignInComponent,data:{value:'signup'} ,canActivate:[SignedInGuard]},
  {
    path: 'app', canActivateChild: [AuthGuardGuard], children: [
      {
        path: '', component: MainInterfaceComponent, children: [
          { path: "invite/:chatroom_id", component: InviteComponentComponent },
          {
            path: 'settings', component: SettingsComponent, children: [
              { path: '', redirectTo: "user-settings", pathMatch: "full" },
              { path: "user-settings", component: UserSettingsComponent }
            ]
          },
          {
            path: ":sidebartype", component: AdditionalSideBarComponent, children: [

              { path: "home", component: FreindsPageComponent },
              { path: ":type/:id", component: ChatComponentComponent },


            ]
          },





        ]
      },

    ]


  },

  { path: '**', redirectTo: 'signin', pathMatch: "full" }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
