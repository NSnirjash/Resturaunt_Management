import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'XYZ Resturaunt';

  isAdmin = false;
  isWaiter = false;
  isUser = false;

  userRole: string | null = null;

  constructor( public authService: AuthService, private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  logout(): void {
    this.authService.logout(); // Call the logout method from AuthService
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.isAdmin = role === 'ADMIN';
      this.isWaiter = role === 'WAITER';
      this.isUser = role === 'USER';
    });
  }
}
