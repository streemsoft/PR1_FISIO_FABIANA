import { ToastsManager } from 'ng2-toastr';
import { SdformatService } from './../../sdformat.service';
import { AtendimentoFireService } from './../atendimento-fire.service';
import { Anamnese } from './anamnese.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-anamnese',
  templateUrl: './anamnese.component.html',
  styleUrls: ['./anamnese.component.css']
})
export class AnamneseComponent implements OnInit {

  ficha:Anamnese;
  dat:string;

  constructor(private fire: AtendimentoFireService, private sdformat : SdformatService, public toastr: ToastsManager, 
    public vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
    this.ficha = new Anamnese('');
  }

  ngOnInit() {
    this.buscarPaciente();
  }

  buscarPaciente(){
    var sel = this.fire.buscaFicha();

    sel.then(x => this.preencherSeletor(x));
    
 }

 alterarFicha(){
   this.ficha.datar = this.sdformat.getDataAtualMili();
   this.fire.atualizaFicha(this.ficha);
   this.dat = this.sdformat.getDataAtualString();
   this.toastr.success('Salvo com sucesso!', 'Atenção!');
 }

 preencherSeletor(x:any){
   if(x!=null){
    this.ficha.key = x.key
    this.ficha.perg1 = x.perg1;
    this.ficha.perg2 = x.perg2;
    this.ficha.perg3 = x.perg3;
    this.ficha.perg4 = x.perg4;
    this.ficha.perg5 = x.perg5;
    this.ficha.perg6 = x.perg6;
    this.ficha.perg7 = x.perg7;
    this.ficha.perg8 = x.perg8;
    this.ficha.perg9 = x.perg9;
    this.ficha.perg10 = x.perg10;
    this.ficha.perg11 = x.perg11;
    this.ficha.perg12 = x.perg12;
    this.ficha.perg13 = x.perg13;
    this.ficha.perg14 = x.perg14;
    this.ficha.perg15 = x.perg15;
    this.ficha.perg16 = x.perg16;
    this.ficha.perg17 = x.perg17;
    this.ficha.perg18 = x.perg18;
    this.ficha.perg19 = x.perg19;
    this.ficha.perg20 = x.perg20;
    this.ficha.perg21 = x.perg21;
    this.ficha.perg22 = x.perg22;
    this.ficha.perg23 = x.perg23;
    this.ficha.perg24 = x.perg24;
    this.ficha.perg25 = x.perg25;
    this.ficha.obs = x.obs;
    this.ficha.datar = x.datar;
    this.dat = this.sdformat.convertMiliDate( x.datar );
   }
 }

}
