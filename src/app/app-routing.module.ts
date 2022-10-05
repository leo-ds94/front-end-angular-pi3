import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/navegacao/home/home.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'home', component: HomeComponent },

  {path: 'biblioteca',
  loadChildren: () => import('./modules/biblioteca/biblioteca.module').then(b => b.BibliotecaModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
