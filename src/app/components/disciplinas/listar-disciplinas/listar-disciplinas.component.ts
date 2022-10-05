import { Router } from '@angular/router';
import  Swal  from 'sweetalert2';
import { DisciplinaService } from './../../../services/disciplina.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Disciplina } from 'src/app/models/Disciplina';

@Component({
  selector: 'app-listar-disciplinas',
  templateUrl: './listar-disciplinas.component.html'
})
export class ListarDisciplinasComponent implements OnInit {

  disciplina!: Disciplina[];
  erro!: any;
  id!: any;
  formResult: string = '';
  disciplinaData!: FormGroup;

  constructor(private router: Router,
              private disciplinaService: DisciplinaService) {}

  inicio() {
    this.router.navigate(['']);
  }

  back() {
    this.router.navigate(['disciplinas']);
  }

  ngOnInit(): void {
    this.getter();
  }

  getter(): void {
    this.disciplinaService.obter().subscribe(
      (data: Disciplina[])  => {
      this.disciplina = data;
    },
    (error: any) => {
      this.erro = error;
      console.error('ERROR: ', error);
    });
  }

  setter(): void {
    // ==> cria um novo objeto com as mesmas propriedades do formulário, para que seja possivel adicionar o id do 'Departamento'
      const disciplina: Disciplina = {
      id: this.id,
      ...this.disciplinaData.value
    };
    this.disciplinaService.alterar(disciplina).subscribe(res => {
      // ==> Depois que o usuário clicar no botão 'Update', será redirecionado para a página de listar 'Employees'
      Swal.fire({
        title: 'Disciplina atualizada com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/disciplinas']);
      });
    });
  }

  onSubmit(): void {
    this.setter();
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
  console.log(this.erro);
  }

}
