import { SdformatService } from './../sdformat.service';
import { PacModel } from './pac/pac.model';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';
import { Sessao } from './sessoes/sessoes.model';

@Injectable()
export class ServicoFireService {

  constructor(private fire : FirebaseService, private sdformat: SdformatService) { }

  getClienteKey(){
    return this.fire.clienteKey.key;
  }

  setProntuarioKey(){
    this.fire.fichaKey = '_false';
  }

  salvarFichaPAC(ficha:PacModel, sessoes:Sessao[], nome:string, tipo:string){
    var newkey = this.fire.getKey('/PRONTUARIOS/GERAL/');

    var _ficha_geral = {
        key: newkey,
				key_cliente: this.fire.clienteKey.key,
				ficha: tipo,
				nome_ficha: nome,
				dt_cad: this.sdformat.getDataAtualMili()
    }

    this.fire.insertChild('/PRONTUARIOS/GERAL/', _ficha_geral, newkey);

    var _ficha_cliente = {
      key: newkey,
      dt_cad: this.sdformat.getDataAtualMili()
    }

    this.fire.insertChild('/PRONTUARIOS/CLIENTE/', _ficha_cliente, newkey);

    var _ficha = {
      key : newkey,
      perg1 : ficha.perg1,
      perg2 : ficha.perg2,
      perg3 : ficha.perg3,
      perg4 : ficha.perg4,
      perg5 : ficha.perg5,
      perg6 : ficha.perg6,
      perg7 : ficha.perg7,
      perg8 : ficha.perg8,
      perg9 : ficha.perg9,
      perg10 : ficha.perg10,
      perg11 : ficha.perg11,
      perg12 : ficha.perg12,
      perg13 : ficha.perg13,
      perg14 : ficha.perg14,

      perg1a : ficha.perg1a,
      perg2a : ficha.perg2a,
      perg3a : ficha.perg3a,
      perg4a : ficha.perg4a,
      perg5a : ficha.perg5a,
      perg6a : ficha.perg6a,
      perg7a : ficha.perg7a,
      perg8a : ficha.perg8a,
      perg9a : ficha.perg9a,
      perg10a : ficha.perg10a,
      perg11a : ficha.perg11a,
      perg12a : ficha.perg12a,
      perg13a : ficha.perg13a,
      perg14a : ficha.perg14a,

      perg15 : ficha.perg15,
      perg16 : ficha.perg16,
      perg17 : ficha.perg17,
      perg18 : ficha.perg18
    }

    this.fire.insertChild('/PRONTUARIOS/DATAIL/', _ficha, newkey);

    for(let i = 0 ; i < sessoes.length ; i++ ){
      var newSe = this.fire.getKey('/SESSOES/GERAL/');
      var _s = {
        key: newSe,
        key_cliente: this.fire.clienteKey.key,
        key_pront: newkey,
        dt_cad: sessoes[i].dt_cad,
        status: sessoes[i].status,
        nome: sessoes[i].nome,
        num: sessoes[i].num,
        ficha: tipo
      }

      this.fire.insertChild('/SESSOES/GERAL/', _s, newSe);

      var _c = {
        key: newSe,
        status: sessoes[i].status
      }

      this.fire.insertChild('/SESSOES/CLIENTE/'+this.fire.clienteKey.key+'/', _c, newSe);
    }

    
   return newkey;


  }

  updateFichaPac(ficha:PacModel, sessoes:Sessao[], nome:string, novaSessoes:any, tipo:string){
        
      var _ficha = {
        key : ficha.key,
        perg1 : ficha.perg1,
        perg2 : ficha.perg2,
        perg3 : ficha.perg3,
        perg4 : ficha.perg4,
        perg5 : ficha.perg5,
        perg6 : ficha.perg6,
        perg7 : ficha.perg7,
        perg8 : ficha.perg8,
        perg9 : ficha.perg9,
        perg10 : ficha.perg10,
        perg11 : ficha.perg11,
        perg12 : ficha.perg12,
        perg13 : ficha.perg13,
        perg14 : ficha.perg14,

        perg1a : ficha.perg1a,
        perg2a : ficha.perg2a,
        perg3a : ficha.perg3a,
        perg4a : ficha.perg4a,
        perg5a : ficha.perg5a,
        perg6a : ficha.perg6a,
        perg7a : ficha.perg7a,
        perg8a : ficha.perg8a,
        perg9a : ficha.perg9a,
        perg10a : ficha.perg10a,
        perg11a : ficha.perg11a,
        perg12a : ficha.perg12a,
        perg13a : ficha.perg13a,
        perg14a : ficha.perg14a,

        perg15 : ficha.perg15,
        perg16 : ficha.perg16,
        perg17 : ficha.perg17,
        perg18 : ficha.perg18
      }

  this.fire.insertChild('/PRONTUARIOS/DATAIL/', _ficha, ficha.key);

    for(let i = novaSessoes ; i < sessoes.length ; i++ ){
      var newSe = this.fire.getKey('/SESSOES/GERAL/');
      var _s = {
        key: newSe,
        key_cliente: this.fire.clienteKey.key,
        key_pront: ficha.key,
        dt_cad: sessoes[i].dt_cad,
        status: sessoes[i].status,
        nome: sessoes[i].nome,
        num: sessoes[i].num,
        ficha: tipo
      }

      this.fire.insertChild('/SESSOES/GERAL/', _s, newSe);

      var _c = {
        key: newSe,
        status: sessoes[i].status
      }

      this.fire.insertChild('/SESSOES/CLIENTE/'+this.fire.clienteKey.key+'/', _c, newSe);
    }

  }

  buscaFicha(){
    if(this.fire.fichaKey == '_false'){
      return null;
    }else{
      return this.fire.selectChild('/PRONTUARIOS/DATAIL/', this.fire.fichaKey);
              
    }
  }

  buscaSessoes(){
    if(this.fire.fichaKey == '_false'){
      
      return null;
    }else{
      return this.fire.selectChildEqual('/SESSOES/GERAL/','key_pront', this.fire.fichaKey);
      
    }
  }
  

}
