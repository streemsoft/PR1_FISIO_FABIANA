import { LocalDbService } from './../../local-db.service';
import { SdformatService } from './../../sdformat.service';
import { Agendamento } from './../Agendamento.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { AgendamentoFireService } from './../agendamento-fire.service';
import { PacSeletor } from './../../pacientes/pacseletor.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  dataesc:any;
  listaAgen:any[] = [];
  listaPac:any[] = [];
  controle:boolean = false;
  controle2:boolean = false;
  closeResult: string;
  searchString:string;
  selecionado:boolean = false;
  pac:PacSeletor;
  time:any = {'hour': 7, 'minute': 0};

  constructor(private firea : AgendamentoFireService, public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal, private sdfomat: SdformatService, private localDB: LocalDbService) { 
    this.dataHoje();
    this.toastr.setRootViewContainerRef(vcr);
    this.pac = new PacSeletor();
  }

  ngOnInit() {
    this.buscarData();
    this.pac = new PacSeletor();
  }

  pacescolhido(x:any){
    this.pac = x;
    this.selecionado = true;
 }

 cancelarAgendamento(x:any){
    this.firea.cancelarAgend(x.key);
    this.buscarData();
    this.toastr.info('Pronto!');
 }

 cadastrarAgendamento():void{

  if(this.validaHoraEscolhida() && this.time != null){
      let d = this.dataesc.split('-');

      var agen:Agendamento = new Agendamento();

      var datahoje:Date = new Date(d[1]+'/'+d[2]+'/'+d[0]);

      agen.datae = datahoje.getTime().toString();

      datahoje.setHours(this.time.hour);
      datahoje.setMinutes(this.time.minute);
      datahoje.setSeconds(0);
      datahoje.setMilliseconds(0);
      agen.tempo = datahoje.getTime().toString();
      agen.hora = this.time.hour+':'+this.time.minute;
      agen.cliente = this.pac.nome;
      agen.keycliente = this.pac.key;
      agen.status = '1';
      this.firea.salvarAgendamento(agen);
      //this.listaAgen.push(agen);
      
      this.toastr.success('Salvo com sucesso!', 'Atenção!');
      this.selecionado = false;
      this.pac = new PacSeletor();
      this.buscarData()
      
  }else{
     this.toastr.warning('Horário Indisponível!', 'Atenção!');
  }
  //console.log(this.ordenaLista());
 }

 validaHoraEscolhida(){
  for(let i=0 ; i < this.listaAgen.length ; i++){
     if(this.listaAgen[i].hora == (this.time.hour+':'+this.time.minute)){
        return false;
     }
  }
  return true;
 }

buscarData():void{
  let d = this.dataesc.split('-');
  let dtescolhida = new Date(d[1]+'/'+d[2]+'/'+d[0]).getTime().toString();

  this.listaAgen= [];
      this.firea.buscarPorData(dtescolhida).then(x=> {
        var username = x.val();
        var json = JSON.stringify(username);
        var obj = JSON.parse(json);

        for(let i in obj){
          var item = obj[i];
          var temp:Agendamento = new Agendamento();
          temp.key = item.key;
          temp.datae = item.nome;
          temp.cliente = item.cliente;
          temp.hora = item.hora;
          temp.status = item.status;
          temp.tempo = item.tempo;
          this.listaAgen.push(temp);
        }       
        if(this.listaAgen.length > 0){
          this.controle = this.ordenaLista();
        }else{            
          this.controle = false;
        }  
    });
}

ordenaLista(){
    
  for(let i=0;i<this.listaAgen.length;i++){
    for(let j=0;j<this.listaAgen.length;j++){
      if(this.listaAgen[i].tempo < this.listaAgen[j].tempo){
          var aux = this.listaAgen[i];
          this.listaAgen[i] = this.listaAgen[j];
          this.listaAgen[j] = aux;
      }
    }
  }
  //console.log('depois');
 // console.log(this.listaAgen);
  return true;
}

dataHoje(){
    this.dataesc = new Date().toLocaleDateString();
    var temp = this.dataesc.split('/');
    this.dataesc = temp[2]+'-'+temp[1]+'-'+temp[0];

}

buscarPaciente(){
  this.controle2 = false;
   if(this.searchString != null && this.searchString != '' && this.searchString != ' ' && this.searchString.length >= 3){
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
          this.controle2 = true;
        }else{
          this.toastr.info('Sem registros!');
          this.controle2 = false;
        }
        
      }else{
        this.toastr.warning('Dados incompletos!', 'Atenção!');
      }

}

}
