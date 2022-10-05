import  Swal  from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/models/Disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exclui-disciplina',
  templateUrl: './exclui-disciplina.component.html'
})
export class ExcluiDisciplinaComponent implements OnInit {

  icons = {
    faTrash
  }

  id!: string;
  disciplina: Disciplina[];
  errors: any[] = [];

  constructor(
    private disciplinaService: DisciplinaService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {

    this.disciplina = this.route.snapshot.data['disciplina'];
    }

    ngOnInit(): void {
      this.getter();
    }

  back() {
    this.router.navigate(['/disciplinas']);
  }

   // Método responsável por excluir um Departamento pelo Id
   excluirDisciplina(id: any): void {
    // ==> Perguntar se o usuario quer realmente deletar..
    Swal.fire({
      title: 'Tem certeza que deseja excluir o Departamento?',
      text: 'Este Departamento será excluído!',
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEnterKey: true,
      allowEscapeKey: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim! Excluir, por favor!'
    }).then((result: any) => {
      if (result.dismiss === Swal.DismissReason.cancel) { // ==> Detectar se a pergunta acima foi recusada
        Swal.fire({
          title: 'Cancelado!',
          text: 'Voltando para a lista de Departamentos',
          icon: 'error',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        });
      } else { // Se a pergunta foi aceita entao...
        this.disciplinaService.excluirDisciplina(id).subscribe(res => {
          Swal.fire({
            title: 'Excluído!',
            text: 'O Departamento foi deletado!',
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
    this.disciplinaService.obter().subscribe((data: Disciplina[]) => {
      this.disciplina = data;
    });
  }

}
