import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule

@Component({
  selector: 'app-otp-validation',
  standalone: true, // Déclaré comme standalone
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.css'],
  imports: [CommonModule], // Ajouter CommonModule ici
})
export class OtpValidationComponent implements OnInit, OnDestroy {
  otp: string = '';
  errorMessage: string = '';
  email: string = '';
  timer: number = 30; // Durée du timer (30 secondes)
  isOtpExpired: boolean = false;
  intervalId: any; // Pour gérer l'intervalle du timer

  constructor(private authService: AuthService, private router: Router) {
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  ngOnInit(): void {
    this.startTimer();
  }

  startTimer(): void {
    this.isOtpExpired = false;
    this.timer = 30; // Réinitialiser le timer à 30 secondes
    this.intervalId = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.isOtpExpired = true;
        clearInterval(this.intervalId); // Arrêter le timer une fois expiré
      }
    }, 1000);
  }

  onOtpInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.otp = inputElement.value;
  }

  onVerifyOtp(): void {
    this.authService.verifyOtp(this.email, this.otp).subscribe({
      next: (response: string) => {
        if (response === 'OTP validé avec succès.') {
          this.router.navigate(['/user']); // Redirection après vérification réussie
        } else {
          this.errorMessage = response; // Affiche directement la réponse comme message d'erreur
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.error || 'Erreur lors de la vérification de l’OTP.';
      },
    });
  }

  onResendOtp(): void {
    this.authService.sendOtp(this.email).subscribe({
      next: () => {
        this.errorMessage = ''; // Réinitialiser le message d'erreur
        this.startTimer(); // Redémarrer le timer après renvoi du nouvel OTP
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de l’envoi du nouveau code OTP.';
      },
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Nettoyer l'intervalle du timer pour éviter les fuites de mémoire
    }
  }
}
