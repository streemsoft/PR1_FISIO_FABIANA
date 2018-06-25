import { ServicoFireService } from './../servico-fire.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessoes',
  templateUrl: './sessoes.component.html',
  styleUrls: ['./sessoes.component.css']
})
export class SessoesComponent implements OnInit {

  constructor(private routes: Router, private fire : ServicoFireService) { }

  ngOnInit() {
  }

  redirect(id:any){
    switch(id){
      case '1':
          this.fire.setProntuarioKey();
          this.routes.navigate(['/servicos/pac']); 
          break;
      case '2':
          this.fire.setProntuarioKey();
          this.routes.navigate(['/servicos/pe']); 
          break;
      case '3':
          this.fire.setProntuarioKey();
          this.routes.navigate(['/servicos/paco']); 
          break;
      case '4':
          this.fire.setProntuarioKey();
          this.routes.navigate(['/servicos/orto']); 
          break;
      case '5':
          this.fire.setProntuarioKey();
          this.routes.navigate(['/servicos/paf']); 
          break;
    }
  }

}
