import { PacSeletor } from './../pacseletor.model';
import { Router } from '@angular/router';
import { LocalDbService } from './../../local-db.service';
import { ToastsManager } from 'ng2-toastr';
import { PacientesFireService } from './../pacientes-fire.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-busca-agend',
  templateUrl: './busca-agend.component.html',
  styleUrls: ['./busca-agend.component.css']
})
export class BuscaAgendComponent implements OnInit {
  public searchString: string;

  listaPac:any[] = [];
  controle:boolean = false;

  constructor(private fire : PacientesFireService, 
              public toastr: ToastsManager, 
              vcr: ViewContainerRef, 
              private router : Router,
              private localDB : LocalDbService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.atualizaDBlocal();
  }

  buscaLocal(){
    this.controle = false;
     if(this.searchString != null && this.searchString != '' && this.searchString != ' '){
        this.listaPac= [];
        for(let i in this.localDB.pacientes){
            var item = this.localDB.pacientes[i];
            if(item.nome.indexOf(this.searchString.toUpperCase()) == 0){
              var temp:PacSeletor = new PacSeletor();
              temp.key = item.key;
              temp.nome = item.nome;
              temp.dt_nasc = new Date(Number(item.dt_nasc)).toLocaleDateString();
              this.listaPac.push(temp);
            }
          }
          if(this.listaPac.length > 0){
            this.controle = true;
          }else{
            this.toastr.info('Sem registros!');
            this.controle = false;
          }

          
        }else{
          this.toastr.warning('Dados incompletos!', 'Atenção!');
        }
  }

  buscarPaciente(){
    this.controle = false;
     if(this.searchString != null && this.searchString != '' && this.searchString != ' '){
        this.listaPac= [];
        this.fire.buscarPorNome(this.searchString.toUpperCase()).then(x=> {
          var username = x.val();
          var json = JSON.stringify(username);
          var obj = JSON.parse(json);

          for(let i in obj){
            var item = obj[i];
            if(item.nome.indexOf(this.searchString.toUpperCase()) == 0){
              var temp:PacSeletor = new PacSeletor();
              temp.key = item.key;
              temp.nome = item.nome;
              temp.dt_nasc = new Date(Number(item.dt_nasc)).toLocaleDateString();
              this.listaPac.push(temp);
            }
          }
          if(this.listaPac.length > 0){
            this.controle = true;
          }else{
            this.toastr.info('Sem registros!');
            this.controle = false;
          }
          });

          
        }else{
          this.toastr.warning('Dados incompletos!', 'Atenção!');
        }

  }

  setPacKey(key:any){
      this.fire.setKeyClienteSelect(key);

      switch(this.fire.rotaDestino()){
        case('1'):
            this.router.navigate(['/agendamento/cadastro']);
      }


  }

  atualizaDBlocal(){
    this.localDB.atualizaDB();
  }

}
