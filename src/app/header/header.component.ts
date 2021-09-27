import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged: string

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isLogged = localStorage.getItem('token')
  }

  logout(): void {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }
}
