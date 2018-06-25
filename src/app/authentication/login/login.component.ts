import { ToastsManager } from 'ng2-toastr';
import { FirebaseService } from './../../firebase.service';
import { Component, OnInit, AfterViewInit, Input, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDbService } from '../../local-db.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

   email:string;
   senha:string;

    constructor(private fire: FirebaseService, public toastr: ToastsManager,
        public vcr: ViewContainerRef, private localDB: LocalDbService) {
            this.toastr.setRootViewContainerRef(vcr);
        }

    ngOnInit() {}

    botaoEntrar():void{
        if(this.email != null && this.senha != null && this.email != '' && this.senha !=''){
            this.fire.loginEmail(this.email,this.senha).then(x =>{
                if(x == false){
                    this.toastr.warning('Email ou senha inválidos!', 'Atenção!');
                }
            });
            
        }else{
            this.toastr.warning('Dados incompletos!', 'Atenção!');
        }
    }

    recuperarSenha(){
        if(this.email != null && this.email != ''){
            if(!this.fire.redefinirSenha(this.email)){
                this.toastr.success('Verifique seu email!', 'Atenção!');
            }else{
                this.toastr.warning('Email inválido!', 'Atenção!');
            }
        }else{
            this.toastr.warning('Digite seu email!', 'Atenção!');
        }
    }

    sair(){
        this.fire.logout();
        this.localDB.removerTudo();
        this.fire.versaoDBlocal = '1';
        localStorage.setItem('sdLocal', '1');
        localStorage.setItem('sdLocalQT', '0');
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }

}
