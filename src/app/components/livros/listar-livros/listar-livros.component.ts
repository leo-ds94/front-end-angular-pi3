import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from 'src/app/models/Livro';
import { LivroService } from 'src/app/services/livro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-livros',
  templateUrl: './listar-livros.component.html'
})
export class ListarLivrosComponent implements OnInit {

  livro!: Livro[];
  erro!: any;

  ngOnInit(): void {
    this.getter();
  }

  constructor(
    private router: Router,
    private listarLivros: LivroService,
    private livroService: LivroService) {}

  getter(): void {
    this.listarLivros.obter().subscribe((data: Livro[] ) => {
      this.livro = data;
    },
    (error: any) => {
      this.erro = error;
      console.error('ERROR: ', error);
    });
  }

  back() {
    this.router.navigate(['/disciplinas']);
  }

  excluirLivro(id: any): void {
    // ==> Perguntar se o usuario quer realmente deletar..
    Swal.fire({
      title: 'Tem certeza que deseja excluir este funcionário?',
      text: 'Este funcionário será excluído!',
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: true,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim! Pode excluir, por favor!'
    }).then((result: any) => {
      if (result.dismiss === Swal.DismissReason.cancel) { // ==> Detectar se a pergunta acima foi recusada
        Swal.fire({
          title: 'Cancelado!',
          text: 'Retornando a lista de Funcionários',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.livroService.excluirLivro(id).subscribe(res => {
          Swal.fire({
            title: 'Excluído!',
            text: 'Funcionário deletado com sucesso!',
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEnterKey: true,
            allowEscapeKey: false,
          });
          this.getter(); // ==> Renovar a lista.
        });
      }
    });
    console.log(this.erro);
  }


}
