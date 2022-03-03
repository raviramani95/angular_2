import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountAmountRef: ElementRef;
  
  constructor() { }

  ngOnInit(): void {
  }

  onAdd(){
    const newIngredient = new Ingredient(
      this.nameInputRef.nativeElement.value , 
      this.amountAmountRef.nativeElement.value);
    
    this.ingredientAdded.emit(newIngredient);
  }
}
