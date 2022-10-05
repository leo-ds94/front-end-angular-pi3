import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Disciplina } from 'src/app/models/Disciplina';
import { DisciplinaService } from 'src/app/services/disciplina.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-disciplina',
  templateUrl: './editar-disciplina.component.html'
})
export class EditarDisciplinaComponent implements OnInit {

  disciplina: Disciplina = new Disciplina();
  id!: string;
  formResult: string = '';
  disciplinaData!: FormGroup;

  constructor(private fb: FormBuilder,
    private disciplinaService: DisciplinaService,
    private router: Router) {}
  ngOnInit() {
    this.disciplinaData = this.fb.group({
      id: '',
      name: ['', Validators.required]
      });

  }

  setter(): void {
    // ==> cria um novo objeto com as mesmas propriedades do formulário, para que seja possivel adicionar o id do 'Employee'
      const disciplina: Disciplina = {
      id: this.id,
      ...this.disciplinaData.value
    };
    this.disciplinaService.alterar(disciplina).subscribe(res => {
      // ==> Depois que o usuário clicar no botão 'Editar', será redirecionado para a página de listar 'Departamentos'
      Swal.fire({
        title: 'Departamento atualizado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/departments']);
      });
    });
}

voltar() {
  this.router.navigate(['/disciplinas']);
}

getControl(control: string): AbstractControl {
  return this.disciplinaData.controls[control];
}

validatorInputs(control: string): boolean {
  return this.getControl(control).invalid &&
   (this.getControl(control).dirty ||
   this.getControl(control).touched);
}

validatorErrorsRequired(control: string): any {
  return this.getControl(control).errors;
}

onSubmit(): void {
  if (!this.id) {
    this.setter();
    }
  }

}
