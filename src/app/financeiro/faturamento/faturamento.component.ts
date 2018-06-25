import { ToastsManager } from 'ng2-toastr';
import { SdformatService } from './../../sdformat.service';
import { FinanceiroFireService } from './../financeiro-fire.service';
import { Recibo } from './../../atendimento/recibos/recibo.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.css']
})
export class FaturamentoComponent implements OnInit {

  recibos:Recibo[] = [];
  select:Recibo;
  controle:boolean = false;
  ini:any
  fim:any;
  total:any;

  constructor(private fire : FinanceiroFireService, private sdformat: SdformatService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.dataHoje()
    this.total = '0.00'
  }

  dataHoje(){
    var x = new Date().toLocaleDateString();
    var temp = x.split('/');
    this.ini = temp[2]+'-'+temp[1]+'-'+temp[0];
    this.fim = this.ini;

}

  buscarRecibos(){
    this.total = '0.00'
    var vl = 0.00;
    this.fire.reciboDetail(this.sdformat.convertDateMili(this.ini), this.sdformat.convertDateMili(this.fim)).then(x=> {
    var json = JSON.stringify(x);
    var obj = JSON.parse(json);

    for(let i in obj){
      var item = obj[i];
          
        var temp:Recibo = new Recibo();
        temp.key = item.key;
        temp.dt_cad = this.sdformat.convertMiliDate(item.dt_cad);
        temp.fpag = item.fpag;
        temp.key_fatura = item.key_fatura;
        temp.vl_pago = item.vl_pago;
        this.recibos.push(temp);      
        vl = vl + Number(item.vl_pago);
    }
    if(this.recibos.length > 0){
      this.recibos.reverse();
      this.controle = true;
      this.total = vl.toFixed(2);
    }else{            
      this.controle = false;
      this.toastr.warning('Sem registros!', 'Atenção!');
    } 
    
      
});
}

}
