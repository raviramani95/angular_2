import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, 
      private authService: AuthService,
      private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onLogout(){
    this.authService.logout();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipe().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe(); 
  }
}
