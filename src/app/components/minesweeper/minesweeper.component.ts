import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@service/auth.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.less']
})
export class MinesweeperComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public logOut(): void {
    this.authService.removeNameFromLocalStorage();
    this.router.navigate(['start']);
  }

}
