import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/Livro';
import { LivroService } from 'src/app/services/livro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exclui-livro',
  templateUrl: './exclui-livro.component.html'
})
export class ExcluiLivroComponent implements OnInit {

  icons = {
    faTrash
  }

  id!: string;
  livro!: Livro[];
  errors: any[] = [];

  constructor(
    private livroService: LivroService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.livro = this.route.snapshot.data['livro'];
    }

    ngOnInit(): void {
      this.getter();
    }

  back() {
    this.router.navigate(['/listar-livros']);
  }

  /**
   * Método responsável por excluir um 'Employee' pelo Id
   */
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
    console.log(this.errors);
  }

 getter(): void {
    this.livroService.obter().subscribe((data: Livro[]) => {
      this.livro = data;
    });
  }

}
