import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  
  private closeSub: Subscription;

  constructor(private authService: AuthService,private router: Router,
      private route: ActivatedRoute, 
      private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      // authObs = this.authService.login(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email,password}));
    }
    else{
      authObs = this.authService.signup(email, password);
    }

    // authObs.subscribe(
    //     resData => {
    //       console.log(resData);
    //       this.isLoading = false;
    //       this.router.navigate(['/recipes']);
    //     }, errorMessage => {
    //       console.log(errorMessage);
    //       this.error = errorMessage;
    //       // this.showErrorAlert(errorMessage);
    //       this.isLoading = false;
    //     }
    // );
      form.reset();
  }
    
  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  
}

