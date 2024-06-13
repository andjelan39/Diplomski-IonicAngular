import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/log-in');
  }
  
}
