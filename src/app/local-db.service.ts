import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { PacSeletor } from './pacientes/pacseletor.model';

@Injectable()
export class LocalDbService {

  pacientes:any[] = [];

  constructor(protected localStorage: LocalStorage, private fire: FirebaseService) { }

  insertItem( id:string , child:any ){
    this.localStorage.setItem( id , child ).subscribe(() => {
      return true;
    }, () => {
      return false;
    });
  }

  insertListItem(childs:any[]){
    let result = true;
    for(let i = 0 ; i < childs.length ; i++){
      if(this.insertItem(String(i) ,childs[i])){
        continue;
      }else{
        result = false;
        break;
      }
    }
    return result;
  }

  getItem( id:string ){
    let result = null;
    this.localStorage.getItem<any>( id ).subscribe((user) => {
      result = user;
    });

    return result;
  }

  getListItem(){
    let qt = Number(localStorage.getItem('sdLocalQT'));
    for( let i = 0; i < qt ; i++){
      this.localStorage.getItem<PacSeletor>( String(i) ).subscribe(user => this.pacientes.push(user));
    }
  }

  removeItem( id:string ){
    this.localStorage.removeItem( id ).subscribe(() => {});
  }

  removerTudo(){
    this.localStorage.clear().subscribe(() => {});
  }

  atualizaDB(){
    this.fire.selectIntervalFist( '/CLIENTES/GERAL/', 'dt_cont', this.fire.versaoDBlocal ).then(x=> {
      var username = x.val();
      var json = JSON.stringify(username);
      var obj = JSON.parse(json);

      if( this.pacientes.length == 0){
        let ct = 0;
        for(let i in obj){
            var item = obj[i];
            this.insertItem( String(ct), item );
            this.pacientes.push(item);
            ct = ct + 1; 
        }
      }else{
          for(let i in obj){
              var item = obj[i];
              var controle = 2;
                  for(let j=0; j<this.pacientes.length;j++){                    
                    if(item.key == this.pacientes[j].key){                  
                      this.insertItem( String(j), item );
                      this.pacientes[j] = item;
                      controle = 1;
                      break;
                    }
                  }
                  if(controle != 1){
                    this.insertItem( String(this.pacientes.length), item );
                    this.pacientes.push(item);
                  }
            
          }
     }
     this.fire.versaoDBlocal = new Date().getTime().toString();
     localStorage.setItem('sdLocal', this.fire.versaoDBlocal);
     localStorage.setItem('sdLocalQT', String(this.pacientes.length));
    });
    
    
  }


}
