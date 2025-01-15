import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard'; // Gardien d'authentification
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './ui/profil/profil.component'; // Import du composant Article
import { OtpValidationComponent } from './ui/otp-page/otp-validation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route vers login
  { path: 'register', component: RegisterComponent  }, // Route vers login
  { path: 'profil', component: ProfilComponent }, // Route pour profil (User)
  { path: 'otp-validation', component: OtpValidationComponent },


  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/login' } // Redirection pour les pages inconnues

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
