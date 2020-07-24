import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';


@Injectable({
  providedIn: 'root'
})
export class BancoService {
  db: SQLiteObject;
  db_nome: string = 'Mais.db';

  constructor(private sqlite :typeof SQLite) { }

  iniciar(){
    return new Promise((resolve,reject)=>{

      this.sqlite.create({
        name: this.db_nome,
        location: 'default'

      }).then((db: SQLiteObject)=>{
        this.db = db;
        resolve("pegando dados do banco");
        this.criarTabelas();
        console.log("pegando dados do banco");

      }).catch((erro)=>{
        reject("Não conseguiu reunir informações do banco");
        console.log("Não conseguiu reunir informações do banco");
      });

    });
  }

  criarTabelas(){
    return new Promise((resolve,reject)=>{
      this.db.executeSql("create table usuario(nome TEXT, sobrenome TEXT, sexo TEXT, contato TEXT, email TEXT, cpf TEXT, cep TEXT, logradouro TEXT, bairro TEXT, localidade TEXT, complemento TEXT, uf TEXT, senha TEXT )",[]).then((data)=>{
        resolve(data);
      }).catch((erro)=>{
        reject(erro);
      });
    });
  }

  insertUsuario(nome,sobrenome,sexo,telefone,email,senha,cpf,cep,endereco){
    return new Promise((resolve,reject)=>{
      this.db.executeSql("INSERT OR REPLACE into usuario (nome, sobrenome, sexo, contato, email, cpf, cep, logradouro, bairro, localidade, complemento, uf, senha ) VALUES "+
      +"('"+ nome +"', '"+ sobrenome +"','"+ sexo +"', '"+telefone+"','"+email+"','"+cpf+"','"+cep+"','"+endereco.logradouro+"','"+endereco.bairro+"','"+endereco.localidade+"','"+endereco.complemento+"','"+endereco.uf+"','"+senha+"' )",[]).then((data)=>{
        resolve(data);
      }).catch((erro)=>{
        reject(erro);
      });
    });
  }

}
