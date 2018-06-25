import { SdformatService } from './../sdformat.service';
import { PacSeletor } from './pacseletor.model';
import { FirebaseService } from './../firebase.service';
import { Injectable } from '@angular/core';
import { Paciente } from './paciente.model';

@Injectable()
export class PacientesFireService {

  constructor(private fire : FirebaseService, private sdformat : SdformatService) { }

  cadastrarPaciente(pacSel:PacSeletor,pac:Paciente):void{
      var pacKey = this.fire.getKey('/CLIENTES/GERAL/');
      var _pacSel = {
        key: pacKey,
        nome: pacSel.nome.toUpperCase(),
        dt_nasc : pacSel.dt_nasc,
        dt_cont : pacSel.dt_cont
      };

      this.fire.insertChild('/CLIENTES/GERAL/', _pacSel, pacKey);

      var _reg = {
        key: pacKey,
        datar:  this.sdformat.getDataAtualMili()
      };

      this.fire.insertChild('/CLIENTES/REGISTRO/', _reg, pacKey);

      var _paciente = {
        key: pacKey,
        sexo:pac.sexo,
        civil:pac.civil.toUpperCase(),
        profissao:pac.profissao.toUpperCase(),
        rua:pac.rua.toUpperCase(),
        bairro:pac.bairro.toUpperCase(),
        numero:pac.numero.toUpperCase(),
        cidade:pac.cidade.toUpperCase(),
        cep:pac.cep,
        telefone:pac.telefone.toUpperCase(),
        email:pac.email,
        medico:pac.medico.toUpperCase(),
        telmed:pac.telmed,
        celular:pac.celular,
        estado:pac.estado.toUpperCase(),
        complemento:pac.complemento.toUpperCase()
      };

      this.fire.insertChild('/CLIENTES/DADOS/', _paciente, pacKey);

      var _anamnese = {
        key : pacKey,
        perg1 : 'Não',
        perg2 : 'Não',
        perg3 : 'Não',
        perg4 : 'Não',
        perg5 : 'Não',
        perg6 : 'Boa',
        perg7 : 'Boa',
        perg8 : 'Não',
        perg9 : 'Não',
        perg10 : 'Não',
        perg11 : 'Não',
        perg12 : 'Não',
        perg13 : 'Não',
        perg14 : 'Não',
        perg15 : 'Não',
        perg16 : 'Não',
        perg17 : 'Não',
        perg18 : 'Não',
        perg19 : 'Não',
        perg20 : 'Não',
        perg21 : 'Não',
        perg22 : 'Não',
        perg23 : 'Não',
        perg24 : 'Não',
        perg25 : 'Não',
        obs : '',
        datar : this.sdformat.getDataAtualMili()
      }
      
      this.fire.insertChild('/ANAMNESE/', _anamnese, pacKey);
  }

  alterarPaciente(pacSel:PacSeletor,pac:Paciente):void{
    if(this.fire.clienteKey != '_false'){
      this.fire.updateChild( '/CLIENTES/GERAL/', pacSel );
      this.fire.updateChild( '/CLIENTES/DADOS/', pac );
    }
  }

  selectPacSeletor(){
    return this.fire.selectChild('/CLIENTES/GERAL/', this.fire.clienteKey.key);
  }

  selectPacCliente(){
    return this.fire.selectChild('/CLIENTES/DADOS/', this.fire.clienteKey.key);
  }

  buscarPorNome(nome:string){
    return this.fire.selectInterval('/CLIENTES/GERAL/', 'nome', nome, "\uf8ff");
  }

  rotaDestino(){
    return this.fire.rotaDestino;
  }

  setKeyClienteSelect(key:any){
    this.fire.clienteKey = key;
  }

  getVersaoDBlocal(){
    return this.fire.versaoDBlocal;
  }

}
