import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Livro } from 'src/app/models/Livro';
import { LivroService } from 'src/app/services/livro.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-livro',
  templateUrl: './editar-livro.component.html'
})
export class EditarLivroComponent implements OnInit {

  errors: any[] = [];

  livro: Livro = new Livro();
  id!: string;
  formResult: string = '';
  livroData!: FormGroup;

  constructor(private fb: FormBuilder,
    private livroService: LivroService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute) {

    }
  ngOnInit() {

    this.livroData = this.fb.group({
      id: '',
      nome: ['', Validators.required]
      });

  }

  setter(): void {
    // ==> cria um novo objeto com as mesmas propriedades do formulário, para que seja possivel adicionar o id do 'Employee'
      const livro: Livro = {
      id: this.id,
      ...this.livroData.value
    };
    this.livroService.editarLivro(livro).subscribe(res => {
      // ==> Depois que o usuário clicar no botão 'Update', será redirecionado para a página de listar 'Employees'
      Swal.fire({
        title: 'Funcionário atualizado com sucesso!',
        icon: 'success',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false,
      }).then((data) => {
        this.router.navigate(['/listar-livros']);
      });
    });
      //this.formResult = JSON.stringify(this.departmentData.value)
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

onSubmit(): void {
  // Se employee tem ID, então é para editar.
  if (!this.id) {
    this.setter();
    }
  }

}
