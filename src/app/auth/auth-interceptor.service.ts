import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if(!user){
        return next.handle(req);//Bunu yazma sebebimiz bu interceptorun tüm requestleri içerisinden geçirmesinden
        //Ötürü sign up ve login işlemleri içinde http param setlemeye çalışmasından dolayı bunu engellemek için
      }
      const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
      return next.handle(modifiedReq);
    }));
    //take 1 ile sadece 1 kez değer alıp sonraki değer değişimini görmezen geliyor çünkü unsub olmuş oluyor
    //exhaustmap ise içerideki observable ın işini tamamlamasını bekliyo sonrasında o işin sonuna kendi
    //observable nesnesini chain ediyor
    //Ardından chain edilmiş observable da user parametresinin tokenini url in sonuna param olarak ekliyor


  }
}
