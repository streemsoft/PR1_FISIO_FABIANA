import { SdformatService } from './../../sdformat.service';
import { ToastsManager } from 'ng2-toastr';
import { PacSeletor } from './../pacseletor.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Paciente } from '../paciente.model';
import { PacientesFireService } from '../pacientes-fire.service';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  seletor:PacSeletor;
  cliente:Paciente;
  dtnasc:any;
  alerta:string;

  constructor( private fire:PacientesFireService, public toastr: ToastsManager, 
                       public vcr: ViewContainerRef, private sdformat: SdformatService ) { 

                        this.seletor = new PacSeletor();
                        this.cliente = new Paciente();
                        this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.buscarPaciente();
  }

  //alterar
  cadastrarPaciente():void{
    if(this.seletor.nome == null || this.seletor.nome == ' ' || this.seletor.nome == '' || this.dtnasc == null || this.dtnasc == ' ' || this.dtnasc == ''){
      this.toastr.warning('Dados incompletos!', 'Atenção!');
      this.alerta = 'has-danger';
    }else{
        this.seletor.dt_nasc = this.sdformat.convertDateMili(this.dtnasc);
        //upercase
        this.cliente.civil= this.cliente.civil.toUpperCase();
        this.cliente.profissao =this.cliente.profissao.toUpperCase();
        this.cliente.rua=this.cliente.rua.toUpperCase();
        this.cliente.bairro=this.cliente.bairro.toUpperCase();
        this.cliente.cidade=this.cliente.cidade.toUpperCase();
        this.cliente.medico=this.cliente.medico.toUpperCase();
        this.cliente.estado=this.cliente.estado.toUpperCase();
        this.cliente.complemento=this.cliente.complemento.toUpperCase();
        this.seletor.nome = this.seletor.nome.toUpperCase();
        this.seletor.dt_cont = this.sdformat.getDataAtualizacao();
        this.fire.alterarPaciente(this.seletor,this.cliente);
        this.toastr.success('Salvo com sucesso!', 'Atenção!');
        this.alerta = '';
      }
  }

  limparPaciente(){
    this.toastr.info('Pronto!');
    //this.fire.excluirPac(this.seletor);
    this.seletor = new PacSeletor();
    this.cliente = new Paciente();
    this.alerta = '';
  }

  buscarPaciente(){
     var sel = this.fire.selectPacSeletor();
     var cli = this.fire.selectPacCliente();

     sel.then(x => this.preencherSeletor(x));
     cli.then(x => this.preencherCliente(x));
     
  }

  preencherSeletor(x:any){
    if(x!=null){
      this.seletor.key = x.key;
      this.seletor.dt_nasc = x.dt_nasc;
      this.seletor.nome = x.nome;
      this.dtnasc = new Date(Number(x.dt_nasc)).toLocaleDateString();
      var temp = this.dtnasc.split('/');
      this.dtnasc = temp[2]+'-'+temp[1]+'-'+temp[0];
    }
  }
  
  preencherCliente(x:any){
    if(x!=null){
      this.cliente.key = x.key;
      this.cliente.medico = x.medico;
      this.cliente.numero = x.numero;
      this.cliente.profissao = x.profissao;
      this.cliente.rua = x.rua;
      this.cliente.sexo = x.sexo;
      this.cliente.telefone = x.telefone;
      this.cliente.telmed = x.telmed;
      this.cliente.bairro = x.bairro;
      this.cliente.celular = x.celular;
      this.cliente.cep = x.cep;
      this.cliente.cidade = x.cidade;
      this.cliente.civil = x.civil;
      this.cliente.complemento = x.complemento;
      this.cliente.email = x.email;
      this.cliente.estado = x.estado;
    }
  }

}
