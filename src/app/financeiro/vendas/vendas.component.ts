import { Recibo } from './../../atendimento/recibos/recibo.model';
import { Fatura } from './../../atendimento/faturas/fatura.model';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SdformatService } from './../../sdformat.service';
import { FinanceiroFireService } from './../financeiro-fire.service';
import { Produto } from './../estoque/Produto.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {

  recibos:Produto[] = [];
  controle:boolean = false;
  valor:any = 0.00;
  fpag:string = 'Dinheiro';
  fat:Produto;
  

  constructor(private fire: FinanceiroFireService,private sdformat: SdformatService, private modalService: NgbModal,  public toastr: ToastsManager,
    public vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
      this.fat = new Produto();
  }

  ngOnInit() {
    this.buscar();
  }

  buscar(){
    this.fire.buscaProdutos().then(x=> {
      var json = JSON.stringify(x);
      var obj = JSON.parse(json);
      
      for(let i in obj){
        var item = obj[i];
         
          var temp:Produto = new Produto();
          temp.key = item.key;
          temp.nome = item.nome;
          temp.qtd = item.qtd;
          temp.valor = item.valor;
          
          this.recibos.push(temp);
                
       
      }
      if(this.recibos.length > 0){
        this.controle = true;
      }else{            
        this.controle = false;
      }       
        
  });
  }

  alterar(){
    this.fire.alteraProduto(this.fat);
    this.toastr.success('Salvo com sucesso!', 'Atenção!');
  }

  vender(){
    if(Number(this.fat.qtd) == 0){
      this.toastr.warning('Produto sem estoque!', 'Atenção!');
    }else{
      this.fat.qtd = String(Number(this.fat.qtd)-1);
      if(this.valor != null && this.valor != '' && this.valor != ' '){
        if(this.fpag == 'Fatura'){
          var a:Fatura = new Fatura();
          a.dt_criada = this.sdformat.getDataAtualMili();
          a.origem = 'Produto';
          a.status = 'Aberta';
          a.vl_pago = '0.00';
          a.vl_total = String(Number(this.valor).toFixed(2));
          this.fire.inserirFatura(a);
          this.fire.alteraProduto(this.fat);
          this.salvaVendaNo();
          this.toastr.success('Salvo com sucesso!', 'Atenção!');
        }else{
          var x:Recibo = new Recibo();
          x.dt_cad = this.sdformat.getDataAtualMili();
          x.fpag = this.fpag;
          x.key_fatura = this.fat.key;
          x.vl_pago = String(Number(this.valor).toFixed(2));
          this.fire.inserirRecivo(x);
          this.fire.alteraProduto(this.fat);
          this.salvaVendaNo();
          this.toastr.success('Salvo com sucesso!', 'Atenção!');
        }
      }else{
        this.toastr.warning('Dados incompletos!', 'Atenção!');
      }
    }
  }

  salvaVendaNo(){
    var _p = {
        key: '0',
				key_prod: this.fat.key,
				dt_cad: this.sdformat.getDataAtualMili(),
				valor:this.valor,
				fpag: this.fpag,
        qtd: '1',
        key_cliente: '0'
    }
    this.fire.inserirVenda(_p);
  }

  open2(content, x:Produto) { 
    this.fat = x;
    this.valor = x.valor;
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

  getNomeCliente(){
    return this.fire.getNomePaciente();
  }
}