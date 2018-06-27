import { routes } from './app-routing.module';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";


@Injectable()
export class FirebaseService {

  firebaseui:string; //verifica login ativo
  firebaseKey:string; //key do usuario
  versaoDBlocal:string;
  clienteKey:any = '_false'; //cliente em atendimento/completo os dados
  rotaDestino:string = '1'; //rota de redirecionamento
  fichaKey:any = '_false'; //cliente em atendimento/completo os dados
  
  /*config:any = {
    apiKey: "AIzaSyAQGo1aa4HER36_YuloS8TKv1-96_Sa_Rg",
    authDomain: "appsdfisio.firebaseapp.com",
    databaseURL: "https://appsdfisio.firebaseio.com",
    projectId: "appsdfisio",
    storageBucket: "",
    messagingSenderId: "986781619624"
  };*/

  config:any = {
    apiKey: "AIzaSyBzQSo8S4ipmdhcPlar7YVsnCVVgt2T6R0",
    authDomain: "estudo-8a066.firebaseapp.com",
    databaseURL: "https://estudo-8a066.firebaseio.com",
    projectId: "estudo-8a066",
    storageBucket: "estudo-8a066.appspot.com",
    messagingSenderId: "677705917496"
  };

  constructor( private router : Router) { 
     firebase.initializeApp(this.config);
      
     firebase.auth().onAuthStateChanged(x => this.authObservable(x));
  }

  getKey(path:string){
    var newKey = firebase.database().ref().child( this.firebaseKey + path ).push().key;
    return  newKey;
  }

  //CRUD
  insertChild( path:string, child:any, newKey:string ):void{
     firebase.database().ref( this.firebaseKey + path + newKey ).set(child);
  }

  updateChild( path:string, child:any ):void{
    var updates = {};
    updates[ this.firebaseKey + path + child.key ] = child;
    
    firebase.database().ref().update(updates);
  }

  deleteChild( path:string ):void{
    var updates = {};
    updates[ this.firebaseKey + path] = null;
    
    firebase.database().ref().update(updates);
  }

  selectChild( path:string, key:string ){
    var child = firebase.database().ref(this.firebaseKey + path + key)
                        .once('value').then(x => {return x.val()});
    return child;
  }

  selectInterval( path:string, child:string, fist:string, last:string ){
    var childs = firebase.database().ref( this.firebaseKey + path )
                         .orderByChild( child ).startAt( fist ).endAt( last )
                                   .once('value').then(x => {return x});
    return childs;
  }

  selectIntervalFist( path:string, child:string, fist:string ){
    var childs = firebase.database().ref( this.firebaseKey + path )
                         .orderByChild( child ).startAt( fist )
                                   .once('value').then(x => {return x});
    return childs;
  }

  selectChildEqual(path:string,child:string, valor:string){
    var lista = firebase.database().ref(this.firebaseKey+path)
                     .orderByChild(child).equalTo(valor).once('value').then(x => {return x});
    
    return lista;   
  }

  //Auth  
  authObservable(user:any):void{
    if (user) {
      this.firebaseui = '_true';
      this.firebaseKey = user.uid;
      localStorage.setItem('AI65z454aSy5454AQ54Go1aa4HER36','_true');
      localStorage.setItem('YusgfdloS8TKvhghg1-96sdgsdf_Sa_Rg', user.uid+'');
    } else {
      localStorage.setItem('AI65z454aSy5454AQ54Go1aa4HER36','_false');
      localStorage.removeItem('YusgfdloS8TKvhghg1-96sdgsdf_Sa_Rg');
      this.firebaseui = '_false';
      this.router.navigate(['/authentication/login']);
    }
  }

  loginEmail(email:string, password:string){  
    return firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => this.loginSucesso()).catch(function(error) {
                  return false;
               });
  }

  loginSucesso(){
    var user = firebase.auth().currentUser;
    if (user) {
      this.firebaseui = '_true';
      this.firebaseKey = user.uid;
      localStorage.setItem('AI65z454aSy5454AQ54Go1aa4HER36','_true');
      localStorage.setItem('YusgfdloS8TKvhghg1-96sdgsdf_Sa_Rg', user.uid+'');
      localStorage.setItem('YusgfdloS8TKvhghdsg1-9f6sdgsdf_Sa_Rg', user.uid+'a1');
      localStorage.setItem('df4wfqQFdfsTssfsdgA','YusgfdloS8TKvhghg1');
      localStorage.setItem('YusgfdloS8TKvhghg1','dsfo4dfTE34sfgOdffg');
      localStorage.setItem('YusgfdloS869s4Qxx5TKvhghg1','dsfo4dfTE34sfgOdffg');
      this.router.navigate(['/dashboard/dashboard1']);
      return true;
    } else {
      return false;
    }
  }
  
  redefinirSenha(email:string){
    var auth = firebase.auth();
    var emailAddress = email;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      return true;
    }).catch(function(error) {
      return false;
    });


  }

  logout():void{
    firebase.auth().signOut().then(function() {
      this.firebaseui = '_false';
      localStorage.setItem('AI65z454aSy5454AQ54Go1aa4HER36','_false');
      localStorage.removeItem('YusgfdloS8TKvhghg1-96sdgsdf_Sa_Rg');
    }).catch(function(error) {
      // An error happened.
    });
  }

}
