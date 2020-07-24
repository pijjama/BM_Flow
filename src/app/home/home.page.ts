
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { AlertController,NavController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'cadastro', loadChildren: './pages/cadastro/cadastro.module#CadastroPageModule' },
{ path: 'resultado', loadChildren: './pages/resultado/resultado.module#ResultadoPageModule' }];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    public navCtrl: NavController) 
  {
  }
  

}
