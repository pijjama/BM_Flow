import { BancoService } from './../banco.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {

  constructor(private http: HttpClient,public alertController: AlertController, public router: Router) {}

  ngOnInit() {
  }

  nome = "";
  sobrenome = "";
  sexo = "";
  fone = "";
  maile = "";
  senh="";
  csenha="";
  cpf="";
  cep:string = "";
  headers;
  endereco = null;
  

  runHttp(){
    this.headers = new Headers({
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    if(this.cep.length < 8 || this.cep.length > 8 ){
      this.presentAlert("CEP Inválido");
    } else if(this.cep.length == 8){
      this.http.get('https://viacep.com.br/ws/'+this.cep+'/json/',{headers: this.headers}).subscribe(data => {
        this.endereco = data;
        console.log();
      });
    }
    
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  cadastra(){
    if(this.senh == this.csenha){
      if(this.senh != "" && this.csenha!=""){
        if(this.nome != "" && this.sobrenome != ""){
          if(this.senh.length >=6 && this.senh.length <= 10){
            if(this.cpf.length == 11){
              if(this.fone.length==13){
                this.router.navigate(['/resultado/'], {
                  state: { 
                    nome: this.nome,
                    sobrenome: this.sobrenome,
                    sexo: this.sexo , 
                    telefone: this.fone, 
                    email : this.maile,
                    senha: this.senh,
                    cpf: this.cpf,
                    cep: this.cep,
                    endereco: this.endereco
                  }
                });
              } else {
                this.presentAlert("Número de telefone inválido");
              }
            }else{
              this.presentAlert("CPF inválido");
            }
          } else {
            this.presentAlert("Sua senha deve ter entre 6 e 10 dígitos");
          }
        } else {
          this.presentAlert("O campo de nome e sobrenome são obrigatórios");
        }
      } else {
        this.presentAlert("O campo de senhas e confirmação de senhas são obrigatórios");
      }
    } else {
      this.presentAlert("Senhas diferentes, por favor digite senhas iguais");
    }
  }

}
