import { Recibo } from './../atendimento/recibos/recibo.model';
import { Fatura } from './../atendimento/faturas/fatura.model';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';
import { Produto } from './estoque/Produto.model';

@Injectable()
export class FinanceiroFireService {

  constructor(private fire: FirebaseService) { }

  buscarBoletos(){
    return this.fire.selectChild('', '/BOLETOS/');
  }

  reciboDetail(ini:string, fim:string){
    return this.fire.selectInterval('/RECIBOS/GERAL/','dt_cad',ini,fim);
  }

  buscaProdutos(){
    return this.fire.selectChild('', '/PRODUTOS/');
  }

  alteraProduto(x:Produto){
    x.nome = x.nome.toUpperCase()
    var _prod = {
      key : x.key,
      nome: x.nome,
      qtd: x.qtd,
      valor: String(Number(x.valor).toFixed(2))
    }

    this.fire.updateChild('/PRODUTOS/',_prod);
  }

  salvarProdut(x:Produto){
    var key = this.fire.getKey('/PRODUTOS/');
    x.nome = x.nome.toUpperCase()
    var _prod = {
      key : key,
      nome: x.nome,
      qtd: x.qtd,
      valor: String(Number(x.valor).toFixed(2))
    }

    this.fire.insertChild('/PRODUTOS/', _prod, key);

    return key;

  }

  getNomePaciente(){
    return this.fire.clienteKey.nome;
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

  inserirVenda(x:any){
    var v = x;
    var pKey = this.fire.getKey('/VENDAS/');
    v.key = pKey;
    v.key_cliente = this.fire.clienteKey.key;
    this.fire.insertChild('/VENDAS/',v, pKey);

  }

}
