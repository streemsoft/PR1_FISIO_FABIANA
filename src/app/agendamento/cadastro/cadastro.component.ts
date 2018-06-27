import { Agendamento } from './../Agendamento.model';
import { LocalDbService } from './../../local-db.service';
import { SdformatService } from './../../sdformat.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { AgendamentoFireService } from './../agendamento-fire.service';
import { PacSeletor } from './../../pacientes/pacseletor.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  dataesc:any;
  listaAgen:any[] = [];
  controle:boolean = false;
  closeResult: string;
  pac:PacSeletor;
  time:any = {'hour': 7, 'minute': 0};

  constructor(private firea : AgendamentoFireService, public toastr: ToastsManager, vcr: ViewContainerRef, private modalService: NgbModal, private sdfomat: SdformatService, private localDB: LocalDbService) { 
    this.dataHoje();
    this.toastr.setRootViewContainerRef(vcr);
    this.pac = new PacSeletor();
  }

  ngOnInit() {
    this.buscarData();
    this.pac = this.firea.getPaciemteSelecionado();
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
      this.controle = true;
      this.toastr.success('Salvo com sucesso!', 'Atenção!');
      this.buscarData();
      
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


}
