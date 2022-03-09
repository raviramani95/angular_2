import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editeditemIndex: number;
  editedItem: Ingredient;
  
  constructor(private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList : { ingredients : Ingredient[] }}> ) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editeditemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      // this.shoppingListService.updateIngredient(this.editeditemIndex,newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        {
          index: this.editeditemIndex, 
          ingredient: newIngredient
        }
      ));
    }
    else{ 
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    if(this.editMode){
      // this.shoppingListService.deleteIngredient(this.editeditemIndex);
      this.store.dispatch(new ShoppingListActions.DeleteIngredient(this.editeditemIndex));
      this.onClear();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
