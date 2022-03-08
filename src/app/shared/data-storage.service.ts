import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  fireBaseUrl = 'https://recipe-book-925ea-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private recipeService: RecipeService,
      private authService: AuthService) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.fireBaseUrl + 'recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      }
    );
  }
  
  fetchRecipe() {
    return this.http
      .get<Recipe[]>(
        this.fireBaseUrl + 'recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          });
        }),
        tap(recipes => {
        this.recipeService.setRecipes(recipes);
        })
      );  

  }
}
