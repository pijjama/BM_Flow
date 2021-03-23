import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  nome = "";
  sobrenome = "";
  sexo = "";
  celular = "";
  email = "";
  senha="";
  csenha="";
  cpf="";
  cep:string = "";
  headers;
  endereco = null;
  datanascimento="";
  telefone="";

  constructor(private router: Router){  
    if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.nome = state.nome ? state.nome : '';
        this.sobrenome = state.sobrenome ? state.sobrenome : '';
        this.datanascimento = state.datanascimento ? state.datanascimento : '';
        this.sexo = state.sexo ? state.sexo : '';
        this.celular = state.celular ? state.celular : '';
        this.telefone = state.telefone ? state.telefone : '';
        this.email = state.email ? state.email : '';
        this.senha = state.senha ? state.senha : '';
        this.cpf = state.cpf ? state.cpf : '';
        this.cep = state.cep ? state.cep : '';
        this.endereco = state.endereco ? state.endereco : '';
      }
      if(this.sexo == "m"){
        this.sexo = "Homem";
      } else if(this.sexo == "f"){
        this.sexo = "Mulher";
      } else {
        this.sexo = "Outro";
      }
  }

  ngOnInit() {
  }

}
