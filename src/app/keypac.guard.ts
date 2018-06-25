import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class KeypacGuard implements CanActivate {

  constructor(private router : Router, private fire : FirebaseService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if('_false'!=this.fire.clienteKey){
            return true;
        }else{
          this.router.navigate(['/dashboard/dashboard1'])
          return false;
        }
  }
}
