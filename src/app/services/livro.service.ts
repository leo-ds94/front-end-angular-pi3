import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Livro } from '../models/Livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  constructor(private http: HttpClient) { }

  protected urlLivros: string = 'https://back-end-api-pi3.herokuapp.com';

  public obter(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.urlLivros + '/livros');
  }

  incluir(livro: Livro): Observable<any> {
    // ==> (POST - url no Back-End): https://back-end-api-pi3.herokuapp.com/add-livro
    return this.http.post(this.urlLivros + '/add-livro', livro);
  }

  editarLivro(livro: Livro): Observable<any> {
    return this.http.put(this.urlLivros + '/livros/'+ livro.id, livro);
  }

  /**
   * Método responsável por excluir um 'Livro' pelo id:
   */
  excluirLivro(id: string): Observable<any> {
    return this.http.delete(this.urlLivros + '/excluir-livro/'+ id);
  }

}
