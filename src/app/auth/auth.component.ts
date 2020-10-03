import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy{
  isLoginMode=true;
  isLoading=false;
  @ViewChild(PlaceholderDirective, {static:false}) alertHost: PlaceholderDirective;

  private closeSubs :Subscription;
  constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;
  }

  onSubmit(authForm:NgForm){
    if(authForm.invalid){
      return;
    }
    const email= authForm.value.email;
    const password=authForm.value.password;
    this.isLoading=true;

    let authObservable:Observable<AuthResponseData>;
    
    if(this.isLoginMode){
      
      authObservable =this.authService.login(email,password);
    }
    else{
      authObservable = this.authService.signup(email,password)
      
    }
    authObservable.subscribe(
      responseData=>{
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      errorMessage =>{
        this.showErrorAlert(errorMessage);
        this.isLoading=false;
      }
    )
    authForm.reset();
  }

  private showErrorAlert(message:string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message= message;
    this.closeSubs =componentRef.instance.close.subscribe(() =>{
        this.closeSubs.unsubscribe();
        hostViewContainerRef.clear();
    });//Burada bu component ı nesne olarak yarattığımız için close eventine de subscribe olarak içeride gerçekleştirilen
    //close işlemini buraya yansıtmak ve container içeriğini temizlemek için subscribe ediyoruz.
  }

  ngOnDestroy(){
    if(this.closeSubs){
      this.closeSubs.unsubscribe();
    } 
  }

}
