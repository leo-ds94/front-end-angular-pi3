import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { HomeComponent } from './components/navegacao/home/home.component';
import { MenuComponent } from './components/navegacao/menu/menu.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AdcLivroComponent } from './components/livros/adc-livro/adc-livro.component';
import { ExcluiLivroComponent } from './components/livros/exclui-livro/exclui-livro.component';
import { AdcDisciplinaComponent } from './components/disciplinas/adc-disciplina/adc-disciplina.component';
import { ExcluiDisciplinaComponent } from './components/disciplinas/exclui-disciplina/exclui-disciplina.component';
import { BibliotecaModule } from './modules/biblioteca/biblioteca.module';
import { ListarDisciplinasComponent } from './components/disciplinas/listar-disciplinas/listar-disciplinas.component';
import { EditarDisciplinaComponent } from './components/disciplinas/editar-disciplina/editar-disciplina.component';
import { ListarLivrosComponent } from './components/livros/listar-livros/listar-livros.component';
import { EditarLivroComponent } from './components/livros/editar-livro/editar-livro.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    AdcLivroComponent,
    ExcluiLivroComponent,
    AdcDisciplinaComponent,
    ExcluiDisciplinaComponent,
    ListarDisciplinasComponent,
    EditarDisciplinaComponent,
    ListarLivrosComponent,
    EditarLivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    BibliotecaModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
