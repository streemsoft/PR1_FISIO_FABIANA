import { Fatura } from './faturas/fatura.model';
import { Recibo } from './recibos/recibo.model';
import { Sessao } from './../servicos/sessoes/sessoes.model';
import { Anamnese } from './anamnese/anamnese.model';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AtendimentoFireService {

  constructor(private fire: FirebaseService) { }

  getNomePaciente(){
    return this.fire.clienteKey.nome;
  }

  //Anamnese -----------------------------------------------
  buscaFicha(){
    return this.fire.selectChild('/ANAMNESE/', this.fire.clienteKey.key);
  }

  atualizaFicha(ficha:Anamnese){
    if(this.fire.clienteKey != '_false'){
      this.fire.updateChild( '/ANAMNESE/', ficha );
    }
  }

  //--------------------------------------------------------
  
  //Recibos ------------------------------------------------
  buscaRecibos(){
    return this.fire.selectChild('/RECIBOS/CLIENTE/', this.fire.clienteKey.key+'/');
  }

  reciboDetail(key:string){
    return this.fire.selectChild('/RECIBOS/GERAL/', key);
  }

  inserirRecivo(x:Recibo){
    var pKey = this.fire.getKey('/RECIBOS/GERAL/');
    var _rec = {
      key: pKey,
      dt_cad: x.dt_cad,
      fpag: x.fpag,
      key_fatura: x.key_fatura,
      vl_pago: x.vl_pago
    }

    var _r = {
      key: pKey,
      dt_cad: x.dt_cad
    }

    this.fire.insertChild('/RECIBOS/GERAL/',_rec, pKey);
    this.fire.insertChild('/RECIBOS/CLIENTE/'+this.fire.clienteKey.key+'/',_r, pKey);
  }

  //Sessoes -----------------------------------------------
  buscaSessoes(){
    return this.fire.selectChildEqual('/SESSOES/CLIENTE/'+this.fire.clienteKey.key+'/','status','Pendente');
  }

  buscaSessoesGeral(key:string){
    return this.fire.selectChild('/SESSOES/GERAL/', key);
  }

  cancelarSessão(ses:Sessao){
    this.fire.updateChild('/SESSOES/GERAL/', ses);
    this.fire.updateChild('/SESSOES/CLIENTE/'+this.fire.clienteKey.key+'/', ses);
  }


  //Faturas -----------------------------------------------
  buscaFaturas(){
    return this.fire.selectChild('/FATURAS/CLIENTE/', this.fire.clienteKey.key+'/');
  }

  faturaDetail(key:string){
    return this.fire.selectChild('/FATURAS/GERAL/', key);
  }

  inserirFatura(x:Fatura){
    var pKey = this.fire.getKey('/FATURAS/GERAL/');
    var _rec = {
          key: pKey,
          dt_criada: x.dt_criada,
          origem: x.origem,
          status: x.status,
          vl_pago: x.vl_pago,
          vl_total: x.vl_total,
          key_cliente: this.fire.clienteKey.key
    }

    var _r = {
      key: pKey,
      dt_cad: x.dt_criada,
      status: x.status
    }

    this.fire.insertChild('/FATURAS/GERAL/',_rec, pKey);
    this.fire.insertChild('/FATURAS/CLIENTE/'+this.fire.clienteKey.key+'/',_r, pKey);
  }

  atualizaFatura(s:Fatura){
    var _r = {
      key: s.key,
      dt_cad: s.dt_criada,
      status: s.status
    }
    this.fire.updateChild('/FATURAS/GERAL/',s);
    this.fire.updateChild('/FATURAS/CLIENTE/'+this.fire.clienteKey.key+'/',_r);
  }

  //Prontuarios -----------------------------------------------
  buscarProntuarios(){
    return this.fire.selectChildEqual('/PRONTUARIOS/GERAL/','key_cliente', this.fire.clienteKey.key);
  }

  setProntuarioKey(key:string){
    this.fire.fichaKey = key;
  }


}
