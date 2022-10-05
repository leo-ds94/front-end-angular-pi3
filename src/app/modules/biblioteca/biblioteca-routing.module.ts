import { EditarLivroComponent } from './../../components/livros/editar-livro/editar-livro.component';
import { ListarLivrosComponent } from './../../components/livros/listar-livros/listar-livros.component';
import { EditarDisciplinaComponent } from './../../components/disciplinas/editar-disciplina/editar-disciplina.component';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AdcDisciplinaComponent } from './../../components/disciplinas/adc-disciplina/adc-disciplina.component';
import { ListarDisciplinasComponent } from './../../components/disciplinas/listar-disciplinas/listar-disciplinas.component';
import { HomeDisciplinasComponent } from './../../components/disciplinas/home-disciplinas/home-disciplinas.component';
import { HttpClient } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgBrazil } from 'ng-brazil';

import { AppComponent } from './../../app.component';
import { LivroService } from 'src/app/services/livro.service';
import { AdcLivroComponent } from 'src/app/components/livros/adc-livro/adc-livro.component';

const bibliotecaRouter: Routes = [

  {path: '', component: HomeDisciplinasComponent,
  children: [

    {path: 'disciplinas', component: ListarDisciplinasComponent}

    ]},

  {path: 'add-disciplina', component: AdcDisciplinaComponent},

  {path: 'editar-disciplina', component: EditarDisciplinaComponent},

  {path: 'listar-livros', component: ListarLivrosComponent},

  {path: 'add-livro', component: AdcLivroComponent},

  {path: 'editar-livro', component: EditarLivroComponent}

];

@NgModule({
  declarations: [HomeDisciplinasComponent
  ],

  imports: [RouterModule.forChild(bibliotecaRouter),
    TextMaskModule,
    NgBrazil,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],

  exports: [RouterModule],
  providers: [HttpClient,
    DisciplinaService,
    LivroService,
    {provide: APP_BASE_HREF, useValue: '/'}],

  bootstrap: [AppComponent]
})

export class BibliotecaRoutingModule { }
