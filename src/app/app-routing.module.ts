import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListUsersComponent} from './components/list-users/list-users.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {UserViewComponent} from './components/user-view/user-view.component'
import {LoginComponent} from './components/login/login.component'
import {AuthGuard} from './core/auth.guard'

const routes: Routes = [
  {path: '', component:ListUsersComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard] },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'user-view/:id', component: UserViewComponent},
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
