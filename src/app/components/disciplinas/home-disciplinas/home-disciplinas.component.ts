import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-disciplinas',
  templateUrl: './home-disciplinas.component.html'
})
export class HomeDisciplinasComponent implements OnInit {

  ngOnInit(): void {}

  constructor(
    private router: Router) {}

  back() {
    this.router.navigate(['/home']);
  }

}
