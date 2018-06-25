import { AtendimentoFireService } from './../atendimento-fire.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atend-router',
  templateUrl: './atend-router.component.html',
  styleUrls: ['./atend-router.component.css']
})
export class AtendRouterComponent implements OnInit {

  nome:string;

  constructor(private fire: AtendimentoFireService) { }

  ngOnInit() {
    this.getNome();
  }

  getNome(){
    this.nome = this.fire.getNomePaciente();
  }

}
