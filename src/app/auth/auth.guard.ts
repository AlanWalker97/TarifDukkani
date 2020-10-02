import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService, private router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean |  UrlTree>  | Promise<boolean | UrlTree> {
        return this.authService.user.pipe(take(1),map(user=>{
            const isAuth= !!user;//boolean değer göndermemiz gerekiyor fakat elimizde user nesnesi var true olarak passlemek için yapıyoruz.
            if(isAuth){
                return true;
            }
            return this.router.createUrlTree(['/auth']);
        }));
    }
}