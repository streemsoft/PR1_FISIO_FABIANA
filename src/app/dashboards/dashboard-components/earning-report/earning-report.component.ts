import { Agendamento } from './../../../agendamento/Agendamento.model';
import { SdformatService } from './../../../sdformat.service';
import { PacSeletor } from './../../../pacientes/pacseletor.model';
import { DashfireService } from './../../dashfire.service';
import { Component } from '@angular/core';
@Component({
    selector: 'earning-report',
	templateUrl: './earning-report.component.html' 
})
export class EarningComponent {

	list:Agendamento[] = []
	controle:boolean = false;
	constructor(private fire: DashfireService, private sdformat:SdformatService) {		
	}

	ngOnInit() {
		this.carregarAgend();
	  }

	carregarAgend(){
		this.fire.buscarPorData().then(x=> {
			var json = JSON.stringify(x.val());
			var obj = JSON.parse(json);
			
			for(let i in obj){
			  var item = obj[i];
			  
			  var temp:Agendamento = new Agendamento();
				temp.key = item.key;
				temp.cliente = item.cliente;
				temp.hora = item.hora;
				temp.tempo = item.tempo;
				
				this.list.push(temp);
				
			}
			
			if(this.list.length > 0){
				console.log(this.ordenaLista());
			  this.controle = true;
			}else{            
			  this.controle = false;
			}
			
			 
		});
	}

	ordenaLista(){
    
		for(let i=0;i<this.list.length;i++){
		  for(let j=0;j<this.list.length;j++){
			if(this.list[i].tempo < this.list[j].tempo){
				var aux = this.list[i];
				this.list[i] = this.list[j];
				this.list[j] = aux;
			}
		  }
		}
		//console.log('depois');
	   // console.log(this.listaAgen);
		return true;
	  }

}