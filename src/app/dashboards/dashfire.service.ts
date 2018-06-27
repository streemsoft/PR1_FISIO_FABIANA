import { PacSeletor } from './../pacientes/pacseletor.model';
import { LocalDbService } from './../local-db.service';
import { SdformatService } from './../sdformat.service';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DashfireService {

  constructor(private fire:FirebaseService, private sdformat: SdformatService, private localDB: LocalDbService) { }

  buscarPorData(){
    var dt = this.sdformat.getDataAtualMili();
    return this.fire.selectChildEqual( '/AGENDAMENTO/','datae', dt );
 }

 buscarAniversariantes(){
  //var dt = this.sdformat.getDataAtualMili();
  //return this.fire.selectChildEqual( '/CLIENTES/GERAL/','dt_nasc', dt );
    var pacs:PacSeletor[] = [];
    var datahoje = new Date();
    for(let i =0 ; i<this.localDB.pacientes.length; i++){
      var x = this.localDB.pacientes[i]; 
      var d = new Date(Number(x.dt_nasc));
      if(datahoje.getDate() == d.getDate()){
        pacs.push(this.localDB.pacientes[i]);
      }
    }
    return pacs;
}



}
