import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountAmountRef: ElementRef;
  
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(){
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value , 
      this.amountAmountRef.nativeElement.value);
    
    this.shoppingListService.addIngredient(newIngredient);
  }
}
