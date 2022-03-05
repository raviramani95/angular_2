import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{

    private recipes: Recipe[] = [
        new Recipe(
          'Pizza',
          'Pizza Dough: Makes enough dough for two 10-12 inch pizzas',
          'https://www.simplyrecipes.com/thmb/JWjdE8YwikAae0KZuyy6ZJW7Utw=/3000x2001/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg',
          [
            new Ingredient('Meat',2),
            new Ingredient('French Fries', 20)
          ]
        ),
        new Recipe(
          'Burger',
          'Burger Dough: Makes enough dough for two 10-12 inch pizzas',
          'https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/zeesmhczd1iijkcl1wym',
          [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
          ]
        )
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }  

    getRecipe(index: number){
      return this.recipes[index];
    }

    addIngridentsToShoppingList(ingredient: Ingredient[]){
      this.slService.addIngredients(ingredient);
    }
}