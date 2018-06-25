import { NgModel } from '@angular/forms';
import { FinanceiroFireService } from './../financeiro-fire.service';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SdformatService } from './../../sdformat.service';
import { Produto } from './Produto.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  recibos:Produto[] = [];
  controle:boolean = false;
  valor:any = 0.00;
  fpag:string = 'Dinheiro';
  fat:Produto;
  fat2:Produto;

  constructor(private fire: FinanceiroFireService,private sdformat: SdformatService, private modalService: NgbModal,  public toastr: ToastsManager,
    public vcr: ViewContainerRef) { 
      this.toastr.setRootViewContainerRef(vcr);
      this.fat = new Produto();
      this.fat2 = new Produto();
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

  salvar(){
    this.fat2.key = this.fire.salvarProdut(this.fat2);
    this.fat2.valor = String(Number(this.fat2.valor).toFixed(2));
    this.toastr.success('Salvo com sucesso!', 'Atenção!');
    this.recibos.push(this.fat2);
    this.fat2 = new Produto();
    this.controle = true
  }

  alterar(){
    this.fire.alteraProduto(this.fat);
    this.fat.valor = String(Number(this.fat.valor).toFixed(2));
    this.toastr.success('Salvo com sucesso!', 'Atenção!');
  }

  open2(content, x:Produto) { 
    this.fat = x;
    this.modalService.open(content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content) { 
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


}
