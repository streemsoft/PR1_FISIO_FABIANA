import { SdformatService } from './../../sdformat.service';
import { Recibo } from './recibo.model';
import { AtendimentoFireService } from './../atendimento-fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibos',
  templateUrl: './recibos.component.html',
  styleUrls: ['./recibos.component.css']
})
export class RecibosComponent implements OnInit {

  recibos:Recibo[] = [];
  select:Recibo;
  controle:boolean = false;

  constructor(private fire : AtendimentoFireService, private sdformat: SdformatService) { }

  ngOnInit() {
    this.buscarRecibos();
  }

  buscarRecibos(){
          this.fire.buscaRecibos().then(x=> {
          var json = JSON.stringify(x);
          var obj = JSON.parse(json);

          for(let i in obj){
            var item = obj[i];
            this.fire.reciboDetail(item.key).then(y=> {
              var json2 = JSON.stringify(y);
              var obj2 = JSON.parse(json2);
          
              var temp:Recibo = new Recibo();
              temp.key = obj2.key;
              temp.dt_cad = this.sdformat.convertMiliDate(obj2.dt_cad);
              temp.fpag = obj2.fpag;
              temp.key_fatura = obj2.key_fatura;
              temp.vl_pago = obj2.vl_pago;
              this.recibos.push(temp);
              if(this.recibos.length > 0){
                this.recibos.reverse();
                this.controle = true;
              }else{            
                this.controle = false;
              }       
                
                
            });
          }
          
            
      });
  }

}
