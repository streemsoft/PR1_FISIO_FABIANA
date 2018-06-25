import { FinanceiroFireService } from './../financeiro-fire.service';
import { Boleto } from './boleto.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.css']
})
export class BoletosComponent implements OnInit {

  recibos:Boleto[] = [];
  controle:boolean = false;

  constructor(private fire : FinanceiroFireService) { }

  ngOnInit() {
    this.buscarProntuarios();
  }

  buscarProntuarios(){
          this.fire.buscarBoletos().then(x=> {
          var json = JSON.stringify(x);
          var obj = JSON.parse(json);
          
          for(let i in obj){
            var item = obj[i];
            
            var temp:Boleto = new Boleto();
              temp.key = item.key;
              temp.desc = item.desc;
              temp.situacao = item.situacao;
              temp.url = item.url;
              temp.valor = item.valor;
              temp.venci = item.venci;
             
              this.recibos.push(temp);
              
          }
          if(this.recibos.length > 0){
            this.recibos.reverse();
            this.controle = true;
          }else{            
            this.controle = false;
          }
           
      });
  }

}
