import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Disciplina } from '../models/Disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  protected urlDisciplina: string = 'https://back-end-api-pi3.herokuapp.com';

  public obter(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.urlDisciplina + '/disciplinas');
  }

  incluir(disciplina: Disciplina): Observable<any> {
    return this.http.post(this.urlDisciplina + '/add-disciplina', disciplina);
  }

  alterar(disciplina: Disciplina): Observable<any> {
    return this.http.put(this.urlDisciplina + '/editar-disciplina/'+ disciplina.id, disciplina);
  }

  /**
   * Método responsável por excluir uma 'Disciplina' pelo id:
   */
  excluirDisciplina(id: string): Observable<any> {
    return this.http.delete(this.urlDisciplina + '/excluir-disciplina/' + id);
  }
}
