import { SdformatService } from './../../../sdformat.service';
import { DashfireService } from './../../dashfire.service';
import { PacSeletor } from './../../../pacientes/pacseletor.model';
import { Component} from '@angular/core';
@Component({
    selector: 'recent-comment',
	templateUrl: './recent-comment.component.html'
})
export class RecentcommentComponent{ 
		
	list:PacSeletor[] = []
	controle:boolean = false;
	constructor(private fire: DashfireService, private sdformat:SdformatService) {		
	}

	ngOnInit() {
		this.carregarAgend();
	  }

	carregarAgend(){
		/*this.fire.buscarAniversariantes().then(x=> {
			var json = JSON.stringify(x.val());
			var obj = JSON.parse(json);
			
			for(let i in obj){
			  var item = obj[i];
			  
			  var temp:PacSeletor = new PacSeletor();
				temp.key = item.key;
				temp.nome = item.nome;
				
				this.list.push(temp);
				
			}
			
			if(this.list.length > 0){
			  this.controle = true;
			}else{            
			  this.controle = false;
			}
						 
		});*/
		this.list = [];
		this.list = this.fire.buscarAniversariantes();
		if(this.list.length > 0){
			this.controle = true;
		}else{            
			this.controle = false;
		}

	}

}