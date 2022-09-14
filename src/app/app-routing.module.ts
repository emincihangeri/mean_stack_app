import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { SendMessageComponent } from './components/send-message/send-message.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { OutboxComponent } from './components/outbox/outbox.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { compileClassMetadata } from '@angular/compiler';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },  // LOGIN
  { path: 'home', component:HomeComponent},
  { path: 'login', component:LoginComponent},
  { path: 'create-user', component: UserCreateComponent },
  { path: 'edit-user/:id', component: UserEditComponent },
  { path: 'users-list', component: UserListComponent }, 
  { path: 'send-message', component: SendMessageComponent},
  { path: 'inbox', component: InboxComponent},
  { path: 'outbox', component: OutboxComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }