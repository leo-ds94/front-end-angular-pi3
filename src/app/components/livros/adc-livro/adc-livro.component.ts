import { DisciplinaService } from 'src/app/services/disciplina.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MASKS } from 'ng-brazil';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/models/Livro';
import { Router } from '@angular/router';
import { LivroService } from 'src/app/services/livro.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Disciplina } from 'src/app/models/Disciplina';

@Component({
  selector: 'app-adc-livro',
  templateUrl: './adc-livro.component.html'
})
export class AdcLivroComponent implements OnInit {

  public MASKS = MASKS;
  disciplina!: Disciplina[];
  erro!: any;
  livro!: Livro[];
  livro_id: number = 0;
  formResult: string = '';
  errors: any[] = [];

  livroData: FormGroup = this.formBuilder.group({
  nome: ['', Validators.required],
  id_disciplina: ['', Validators.required]
  });


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private addlivro: LivroService,
    private toastr: ToastrService,
    private disciplinaService: DisciplinaService) {}

  ngOnInit(): void {
    }

  back() {
    this.router.navigate(['/listar-livros']);
  }

  getControl(control: string): AbstractControl {
    return this.livroData.controls[control];
  }

  validatorInputs(control: string): boolean {
    return this.getControl(control).invalid &&
     (this.getControl(control).dirty ||
     this.getControl(control).touched);
  }

  validatorErrorsRequired(control: string): any {
    return this.getControl(control).errors;
  }

  /*post(){
    this.addlivro.incluir(this.livroData.value).subscribe(
      (data: Livro) => this.livro = data);
    console.log(this.livro);
    this.formResult = JSON.stringify(this.livroData.value);
  }*/

  post(){
    this.addlivro.incluir(this.livroData.value).subscribe(res => {
        Swal.fire({
          title: 'Livro adicionado com successo!',
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEnterKey: true,
          allowEscapeKey: false,
        }).then((data) => {
          // ==> Aguardar que a pessoa clique em OK no SweetAlert para que mude ela para a tela de listagem.
          this.router.navigate(['/listar-livros']);
        });
      });
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

  procSucesso() {
    this.toastr.success('Registro realizado com sucesso!');
    this.livroData.reset();
    this.errors = [];
  }

  procFalha(fail: any) {
    this.errors = fail.error.errors;
    this.toastr.error('Ocorreu um erro!');
  }

  //Método do submit do formulário.
  onSubmit(): void {
    // Se employee nao tem ID, então é para cadastrar.
    if (!this.livro_id) {
      this.post();
      this.procSucesso();
    }

  }

}
