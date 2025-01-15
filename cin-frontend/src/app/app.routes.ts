import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { UserHomeComponent } from './ui/user-home/user-home.component';
import { ProfilComponent } from './ui/profil/profil.component'; // Import du composant Article
import { RegisterComponent } from './register/register.component'; // Import du composant Article
import { OtpValidationComponent } from './ui/otp-page/otp-validation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 
  { path: 'utilisateur', component: UtilisateurComponent } ,
  { path: 'user', component: UserHomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'otp-validation', component: OtpValidationComponent },


  // for user

  { path: 'profil', component: ProfilComponent }, // Route pour Article (User)
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
