import { SdformatService } from './../sdformat.service';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class DashfireService {

  constructor(private fire:FirebaseService, private sdformat: SdformatService) { }

  buscarPorData(){
    var dt = this.sdformat.getDataAtualMili();
    return this.fire.selectChildEqual( '/AGENDAMENTO/','datae', dt );
 }

 buscarAniversariantes(){
  var dt = this.sdformat.getDataAtualMili();
  return this.fire.selectChildEqual( '/CLIENTES/GERAL/','dt_nasc', dt );
}

}
