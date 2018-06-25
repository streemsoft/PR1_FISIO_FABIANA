import { SdformatService } from './../../sdformat.service';
import { PacSeletor } from './../pacseletor.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacientesFireService } from '../pacientes-fire.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  seletor:PacSeletor;
  cliente:Paciente;
  dtnasc:any;
  alerta:string;

  constructor( private fire:PacientesFireService, public toastr: ToastsManager,
               public vcr: ViewContainerRef, private sdformat: SdformatService  ) { 
    this.seletor = new PacSeletor();
    this.cliente = new Paciente();
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  cadastrarPaciente():void{
    if(this.seletor.nome == null || this.seletor.nome == ' ' || this.seletor.nome == '' || this.dtnasc == null || this.dtnasc == ' ' || this.dtnasc == ''){
      this.toastr.warning('Dados incompletos!', 'Atenção!');
      this.alerta = 'has-danger';
    }else{
        this.seletor.dt_nasc = this.sdformat.convertDateMili(this.dtnasc);
        this.seletor.dt_cont = this.sdformat.getDataAtualizacao();
        this.fire.cadastrarPaciente(this.seletor,this.cliente);
        this.seletor = new PacSeletor();
        this.cliente = new Paciente();
        this.dtnasc = null;
        this.toastr.success('Salvo com sucesso!', 'Atenção!');
        this.alerta = '';
      }
  }

  limparPaciente(){
    this.seletor = new PacSeletor();
    this.cliente = new Paciente();
    this.alerta = '';
    this.toastr.info('Pronto!');
  }

}
