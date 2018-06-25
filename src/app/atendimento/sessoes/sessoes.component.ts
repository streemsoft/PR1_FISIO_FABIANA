import { ToastsManager } from 'ng2-toastr';
import { Fatura } from './../faturas/fatura.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Sessao } from './../../servicos/sessoes/sessoes.model';
import { SdformatService } from './../../sdformat.service';
import { AtendimentoFireService } from './../atendimento-fire.service';
import { SessaoCli } from './../../servicos/sessoes/sessao-cli.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Recibo } from '../recibos/recibo.model';

@Component({
  selector: 'app-sessoes',
  templateUrl: './sessoes.component.html',
  styleUrls: ['./sessoes.component.css']
})
export class SessoesComponent implements OnInit {

  recibos:Sessao[] = [];
  controle:boolean = false;
  valor:any = 0.00;
  valort:any;
  fpag:string = 'Dinheiro';
  fat:Sessao;

  constructor(private fire : AtendimentoFireService, private sdformat: SdformatService,
     private modalService: NgbModal, private routes: Router, public toastr: ToastsManager,
     public vcr: ViewContainerRef) { 
       this.toastr.setRootViewContainerRef(vcr);
     }

  ngOnInit() {
    this.buscarRecibos();
    
  }

  buscarRecibos(){
          this.fire.buscaSessoes().then(x=> {
          var json = JSON.stringify(x);
          var obj = JSON.parse(json);

          for(let i in obj){
            var item = obj[i];
            this.fire.buscaSessoesGeral(item.key).then(y=> {
              var json2 = JSON.stringify(y);
              var obj2 = JSON.parse(json2);
          
              var temp:Sessao = new Sessao();
              temp.key = obj2.key;
              temp.dt_cad = this.sdformat.convertMiliDate(obj2.dt_cad);
              temp.key_cliente = obj2.key_cliente;
              temp.key_pront = obj2.key_pront;
              temp.nome = obj2.nome;
              temp.num = obj2.num;
              temp.status = obj2.status;
              temp.ficha = obj2.ficha;
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

  open2(content, x:Sessao) { 
    this.fat = x;
    this.modalService.open(content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  redirect(id:any){
    switch(id.ficha){
      case '1':
          this.fire.setProntuarioKey(id.key_pront)
          this.routes.navigate(['/servicos/pac']); 
          break;
      case '2':
          this.fire.setProntuarioKey(id.key_pront)
          this.routes.navigate(['/servicos/pe']); 
          break;
      case '3':
          this.fire.setProntuarioKey(id.key_pront)
          this.routes.navigate(['/servicos/paco']); 
          break;
      case '4':
          this.fire.setProntuarioKey(id.key_pront)
          this.routes.navigate(['/servicos/orto']); 
          break;
      case '5':
          this.fire.setProntuarioKey(id.key_pront)
          this.routes.navigate(['/servicos/paf']); 
          break;
    }
  }

  cancelar(ses:Sessao){
    if(ses.status == 'Pendente'){
      var x = ses;
      x.status = 'Cancelada';
      x.dt_cad = this.sdformat.getDataAtualMili();
      this.fire.cancelarSessão(x);
      this.toastr.success('Cancelado com sucesso!', 'Atenção!');
    }else{
      this.toastr.warning('Sessão Realizada!', 'Atenção!');
    }
  }

  pagar(){

    if(this.fat.status == 'Pendente'){
      if(this.valor != null && this.valor != '' && this.valor != ' '){
        if(this.fpag == 'Fatura'){
          var a:Fatura = new Fatura();
          a.dt_criada = this.sdformat.getDataAtualMili();
          a.origem = 'Sessão';
          a.status = 'Aberta';
          a.vl_pago = '0.00';
          a.vl_total = this.valor.toFixed(2);
          var xx = this.fat;
          xx.status = 'Realizada';
          xx.dt_cad = this.sdformat.getDataAtualMili();
          this.fire.cancelarSessão(xx);
          this.fire.inserirFatura(a);
          this.toastr.success('Salvo com sucesso!', 'Atenção!');
          this.valor = 0.00;
        }else{
          var x:Recibo = new Recibo();
          x.dt_cad = this.sdformat.getDataAtualMili();
          x.fpag = this.fpag;
          x.key_fatura = this.fat.key;
          x.vl_pago = String(this.valor.toFixed(2));
          var xx = this.fat;
          xx.status = 'Realizada';
          xx.dt_cad = this.sdformat.getDataAtualMili();
          this.fire.cancelarSessão(xx);
          this.fire.inserirRecivo(x);
          this.toastr.success('Salvo com sucesso!', 'Atenção!');
          this.valor = 0.00;
        }
      }else{
        this.toastr.warning('Dados incompletos!', 'Atenção!');
      }
      
    }else{
      this.toastr.warning('Sessão Realizada!', 'Atenção!');
    }

  }

}
