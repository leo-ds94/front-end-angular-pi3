import  Swal  from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Disciplina } from 'src/app/models/Disciplina';
import { Router } from '@angular/router';
import { DisciplinaService } from 'src/app/services/disciplina.service';

@Component({
  selector: 'app-adc-disciplina',
  templateUrl: './adc-disciplina.component.html'
})
export class AdcDisciplinaComponent implements OnInit {

  disciplina!: Disciplina;
  id: number = 0;
  formResult: string = '';
  errors: any[] = [];

  disciplinaData: FormGroup = this.formBuilder.group({
  nome: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private addDisciplina: DisciplinaService) {}

  ngOnInit(): void {

  }

  back() {
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

  post(){
    this.addDisciplina.incluir(this.disciplinaData.value).subscribe(res => {
        Swal.fire({
          title: 'Disciplina adicionada com successo!',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then((data) => {
          // ==> Aguardar que a pessoa clique em OK no SweetAlert para que mude ela para a tela de listagem.
          this.router.navigate(['/disciplinas']);
        });
      });
  }
  //Método do submit do formulário.
  onSubmit(): void {
    if (!this.id) {
      this.post();
    }

  }
}
