import { ToastsManager } from 'ng2-toastr';
import { SdformatService } from './../../sdformat.service';
import { ServicoFireService } from './../servico-fire.service';
import { Sessao } from './../sessoes/sessoes.model';
import { PacModel } from './../pac/pac.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-paco',
  templateUrl: './paco.component.html',
  styleUrls: ['./paco.component.css']
})
export class PacoComponent implements OnInit {

  ficha:PacModel;
  sessoes:Sessao[] = [];
  proced:string = 'Tratamento Corporal'; 
  qtd:any;

  constructor(private fire: ServicoFireService, private sdformat : SdformatService, public toastr: ToastsManager,
    public vcr: ViewContainerRef) {
    this.ficha = new PacModel('');
    this.toastr.setRootViewContainerRef(vcr);
   }
   
   inicialiaTela(){
     var t = this.fire.buscaFicha();
     if(t == null){
        this.ficha = new PacModel('');
     }else{
       t.then(x => {
        var json2 = JSON.stringify(x);
              var obj2 = JSON.parse(json2);
        
              var temp:PacModel = new PacModel('');
              
              temp.key = obj2.key;
              temp.perg1 = obj2.perg1;
              temp.perg2 = obj2.perg2;
              temp.perg3 = obj2.perg3;
              temp.perg4 = obj2.perg4;
              temp.perg5 = obj2.perg5;
              temp.perg6 = obj2.perg6;
              temp.perg7 = obj2.perg7;
              temp.perg8 = obj2.perg8;
              temp.perg9 = obj2.perg9;
              temp.perg10 = obj2.perg10;
              temp.perg11 = obj2.perg11;
              temp.perg12 = obj2.perg12;
              temp.perg13 = obj2.perg13;
              temp.perg14 = obj2.perg14;
  
              temp.perg1a = obj2.perg1a;
              temp.perg2a = obj2.perg2a;
              temp.perg3a = obj2.perg3a;
              temp.perg4a = obj2.perg4a;
              temp.perg5a = obj2.perg5a;
              temp.perg6a = obj2.perg6a;
              temp.perg7a = obj2.perg7a;
              temp.perg8a = obj2.perg8a;
              temp.perg9a = obj2.perg9a;
              temp.perg10a = obj2.perg10a;
              temp.perg11a = obj2.perg11a;
              temp.perg12a = obj2.perg12a;
              temp.perg13a = obj2.perg13a;
              temp.perg14a = obj2.perg14a;
  
              temp.perg15 = obj2.perg15;
              temp.perg16 = obj2.perg16;
              temp.perg17 = obj2.perg17;
              temp.perg18 = obj2.perg18;
              temp.perg19 = obj2.perg19;
              temp.perg20 = obj2.perg20;
              temp.perg21 = obj2.perg21;
              temp.perg22 = obj2.perg22;
              temp.perg23 = obj2.perg23;
              temp.perg24 = obj2.perg24;
              temp.perg25 = obj2.perg25;
              temp.perg26 = obj2.perg26;
              temp.perg27 = obj2.perg27;
              temp.perg28 = obj2.perg28;
  
              this.ficha = temp;
  
      });
     }
  }

  ngOnInit() {
    this.inicialiaTela();
    this.iniciarSessao();
  }

  incluirSessao(){
    var x:Sessao = new Sessao();

    x.key_cliente = this.fire.getClienteKey();
    x.nome = this.proced.toUpperCase();
    x.status = 'Pendente';
    x.num = String((this.sessoes.length + 1));
    this.sessoes.push(x);
  }

  iniciarSessao(){
    var dadoz = this.fire.buscaSessoes();
    if(dadoz == null){
      var x:Sessao = new Sessao();

      /*x.key_cliente = this.fire.getClienteKey();
      x.nome = this.proced.toUpperCase();
      x.status = 'Pendente';
      x.num = String((this.sessoes.length + 1));
      this.sessoes.push(x);*/
    }else{
        dadoz.then(x=>{
          var json2a = JSON.stringify(x);
              var obj2a = JSON.parse(json2a);

              for(let i in obj2a){
                  var item = obj2a[i];
                  var temp:Sessao = new Sessao();
                
                  temp.key = item.key; 
                  temp.status = item.status;
                  temp.num = item.num;
                  temp.nome = item.nome;
                  temp.key_pront = item.key_pront;
                  temp.key_cliente = item.key_cliente;
                  if(item.dt_cad != ''){
                    temp.dt_cad = this.sdformat.convertMiliDate(item.dt_cad);
                  }
                  this.sessoes.push(temp);
              }
              this.qtd = this.sessoes.length;
        });
       
    }

  }

  converterData(dt:any){
    return this.sdformat.convertMiliDate(dt);
  }

  salvarFicha(){
    if(this.ficha.key == ''){
      this.ficha.key = this.fire.salvarFichaPAC(this.ficha, this.sessoes,'Tratamento Corporal', '3');
      this.toastr.success('Salvo com sucesso!', 'Atenção!');
    }else{
      this.fire.updateFichaPac(this.ficha, this.sessoes,'Tratamento Ortopedia', this.qtd,'3');
      this.qtd = this.sessoes.length;
      this.toastr.success('Salvo com sucesso!', 'Atenção!');
    }
  }
}
