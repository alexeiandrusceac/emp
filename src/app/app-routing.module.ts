import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserViewComponent} from './components/user-view/user-view.component'
import {AuthGuard} from '@angular/fire/auth-guard'
import {LoginComponent} from './components/login/login.component'

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'users', component: ListUsersComponent, canActivate: [AuthGuard]},
  {path: 'user-view/:id', component: UserViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
