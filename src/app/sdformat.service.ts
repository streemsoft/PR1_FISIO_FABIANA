import { Injectable } from '@angular/core';

@Injectable()
export class SdformatService {

  constructor() { }

  getDataAtualMili(){
    var hj = new Date();
    hj.setHours(0);
    hj.setMinutes(0);
    hj.setSeconds(0);
    hj.setMilliseconds(0);

    return hj.getTime().toString();
  }

  getDataAtualString(){
    var result = new Date().toLocaleDateString();

    return result;
  }

  convertDateMili(_data:string){
    var d = _data.split('-');

    return new Date(d[1]+'/'+d[2]+'/'+d[0]).getTime().toString();
  }

  getDataAtualizacao(){
    return new Date().getTime().toString();
  }

  convertMiliDate(_dt:string){
    var result = new Date(Number(_dt)).toLocaleDateString();

    return result;
  }

}
