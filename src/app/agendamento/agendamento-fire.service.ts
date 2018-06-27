import { Agendamento } from './Agendamento.model';
import { SdformatService } from './../sdformat.service';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AgendamentoFireService {

  constructor(private fire : FirebaseService, private sdformat : SdformatService) { }

  buscarPorData(dt:string){
     return this.fire.selectChildEqual( '/AGENDAMENTO/','datae', dt );
  }

  cancelarAgend(x:any){
    this.fire.deleteChild('/AGENDAMENTO/'+x)
  }

  
salvarAgendamento(ag:Agendamento){
  var newKey = this.fire.getKey( '/AGENDAMENTO/' );
  
  var _agen = {
    key:newKey,
    datae:ag.datae,
    cliente: ag.cliente,
    keycliente: ag.keycliente,
    hora: ag.hora,
    status: ag.status,
    tempo: ag.tempo
  }

  this.fire.insertChild( '/AGENDAMENTO/', _agen, newKey );
}

 getPaciemteSelecionado(){
    return this.fire.clienteKey;
 }

}
