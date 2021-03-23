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
  telefone = "";
  maile = "";
  senh="";
  csenha="";
  cpf="";
  cep:string = "";
  headers;
  endereco = null;
  complemento_endereco="";
  dataNascimento=null;

  nomePreenchido = false;
  sobrenomePreenchido = false;
  dataNascimentoPreenchida = false;
  cpfPreenchido = false;

  celularPreenchido = false;
  telefonePreenchido = false;
  whatsapp = false;

  enderecoPreenchido = false;
  complementoPreenchido = false;

  emailPreenchido = false;
  senhaPreenchida = false;
  senha2Preenchida = false;

  cadastroCompleto = false;

  

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
      header: 'Ops...',
      subHeader: 'Be&You informa que',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  cadastra(){
    if(this.nome != ""){
      if(this.sobrenome != ""){
        if(this.dataNascimento != null){
          if(this.cpf != "" && this.cpf.length == 11){
            if(this.fone != "" && this.fone.length==11){
              if(this.telefone.length==0 || this.telefone.length==10){
                if(this.endereco != null && this.cep != ""){
                  if(this.complemento_endereco != ""){
                    this.endereco.complemento = this.complemento_endereco;
                    if(this.senh != "" && this.csenha!=""){
                      if(this.senh.length >=6 && this.senh.length <= 10){
                        if(this.senh == this.csenha){
                          if(this.maile != ""){
                            this.router.navigate(['/resultado/'], {
                              state: { 
                                nome: this.nome,
                                sobrenome: this.sobrenome,
                                datanascimento: this.dataNascimento,
                                sexo: this.sexo , 
                                celular: this.fone, 
                                telefone: this.telefone,
                                email : this.maile,
                                senha: this.senh,
                                cpf: this.cpf,
                                cep: this.cep,
                                endereco: this.endereco
                              }
                            });
                          }else this.presentAlert("E-mail não foi informado");
                        }else this.presentAlert("As senhas informadas não são iguais");
                      }else this.presentAlert("A senha informada precisa ter entre 6 e 10 caracteres");
                    }else this.presentAlert("Dados de senhas não foram devidamente informados");
                  }else this.presentAlert("Por favor, informe o complemento do seu endereço");
                }else this.presentAlert("Por favor, informe um cep válido para ser consultado"); 
              }else this.presentAlert("Número de telefone fixo inválido");
            }else this.presentAlert("Número de celular inválido");
          }else this.presentAlert("Por favor, informe seu cpf");
        }else this.presentAlert("Por favor, informe sua data de nascimento");
      }else this.presentAlert("Por favor, informe seu sobrenome");
    }else this.presentAlert("Por favor, informe seu nome");
  }

}
