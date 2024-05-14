import { finalize, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  Validators,
  UntypedFormGroup,
  UntypedFormArray,
  UntypedFormBuilder,
} from '@angular/forms';

import { AcsToastService } from '@acs/services/toast';
import { RecipeInterface } from '../../recipes.types';
import { RecipesService } from '../../recipes.service';
import { CategoryInterface } from '../../../admin/categories/categories.types';
import { CategoriesService } from 'src/app/modules/admin/categories/categories.service';
import { UnityTypeInterface } from 'src/app/modules/admin/unity-types/unity-types.types';
import { UnityTypeService } from 'src/app/modules/admin/unity-types/unity-types.service';

@Component({
  selector: 'recipes-form',
  templateUrl: './recipes-form.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .custom-file-upload {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 6px;
        background-color: #4caf50;
        color: white;
        cursor: pointer;
        border-radius: 4px;
        text-align: center;
        margin-top: 6px;
        height: 48px;
      }
    `,
  ],
})
export class RecipesFormComponent implements OnInit, OnDestroy {
  public id: string;
  public form: UntypedFormGroup;
  public recipe: RecipeInterface;
  public selectedUnityTypes = [];
  public selectedFile: string | ArrayBuffer = '';
  public selectedFileName: string = '';
  public categories: CategoryInterface[];
  public unityTypes: UnityTypeInterface[];

  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly service: RecipesService,
    private readonly toastService: AcsToastService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: UntypedFormBuilder,
    private readonly categoryService: CategoriesService,
    private readonly unityTypeService: UnityTypeService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
      ingredients: this.formBuilder.array([]),
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) {
        void this.service
          .findOne(this.id)
          .pipe(takeUntil(this.unsubscribeAll))
          .subscribe((res: RecipeInterface): void => {
            this.recipe = res;
            const ingredientsArray = this.form.get(
              'ingredients'
            ) as UntypedFormArray;
            res.ingredients.forEach((ingredient, index) => {
              ingredientsArray.push(
                this.formBuilder.group({
                  name: [ingredient.name, [Validators.required]],
                  unityType: [ingredient.unityType.id, [Validators.required]],
                  unityValue: [ingredient.unityValue, [Validators.required]],
                })
              );
              this.selectedUnityTypes[index] = `${ingredient.unityType.id}`;
              ingredientsArray.updateValueAndValidity();
            });

            this.selectedFileName = this.getNameOfImage(res.image);
            this.form.patchValue({ ...res, category: res.category.id });
          });
      }
    });

    this.categoryService.findAll().subscribe((res) => {
      this.categories = res.rows;
    });
    this.unityTypeService.findAll().subscribe((res) => {
      this.unityTypes = res.rows;
    });
  }

  getNameOfImage(imageUrl: string): string {
    try {
      let url = new URL(imageUrl);
      let pathSegments = url.pathname.split('/');
      return pathSegments[pathSegments.length - 1];
    } catch (error) {
      console.error('Erro ao extrair o nome do arquivo da URL', error);
      return '';
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  onChangeUnityType(): void {}

  handleSaveOrUpdate(): void {
    this.form.disable();
    const formValue = {
      ...this.form.value,
    };
    delete formValue.image;

    const formData = new FormData();
    const blob = new Blob([this.selectedFile], { type: 'image/png' });
    formData.append('image', blob, this.selectedFileName);

    let recipe = {};
    for (let key in formValue) {
      recipe[key] = formValue[key];
    }
    if (this.id) {
      recipe = { ...recipe, id: this.id };
    }
    formData.append('recipe', JSON.stringify(recipe));

    if (this.id) {
      this.service
        .update(this.id, formData)
        .pipe(
          takeUntil(this.unsubscribeAll),
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, { handleRequest: true });
            this.router.navigateByUrl('receitas');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível modificar a receita.',
              { handleRequest: true }
            );
          },
        });
    } else {
      this.service
        .create(formData)
        .pipe(
          takeUntil(this.unsubscribeAll),
          finalize(() => {
            this.form.enable();
          })
        )
        .subscribe({
          next: (res) => {
            this.toastService.handleMessage(res, null, { handleRequest: true });
            this.router.navigateByUrl('receitas');
          },
          error: (error) => {
            this.toastService.handleMessage(
              error,
              'Não foi possível criar a receita.',
              { handleRequest: true }
            );
          },
        });
    }
  }

  getIngredientsForm(): UntypedFormArray {
    return this.form.get('ingredients') as UntypedFormArray;
  }

  addNewIngredient(): void {
    const ingredientsArray = this.form.get('ingredients') as UntypedFormArray;
    ingredientsArray.push(
      this.formBuilder.group({
        name: ['', [Validators.required]],
        unityType: ['', [Validators.required]],
        unityValue: ['', [Validators.required]],
      })
    );
  }

  deleteIngredientForm(index: number): void {
    const ingredientsArray = this.form.get('ingredients') as UntypedFormArray;
    ingredientsArray.removeAt(index);
    this.selectedUnityTypes.splice(index, 1);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      this.form.get('image').setValue(file.name);
      this.selectedFile = file;
    }
  }

  checkInput(value: string, index: number) {
    const ingredientsArray = this.form.get('ingredients') as UntypedFormArray;
    const ingredientForm = ingredientsArray.controls[index].get('unityValue');
    const floatValue = parseFloat(value);
    if (floatValue <= 0) {
      ingredientForm.setValue(1);
    } else if (floatValue % 0.5 !== 0) {
      ingredientForm.setValue(Math.round(floatValue * 2) / 2);
    } else if (floatValue % 1 === 0) {
      console.log(
        '🚀 ~ RecipesFormComponent ~ checkInput ~ floatValue:',
        floatValue
      );
      ingredientForm.setValue(
        floatValue > 1 ? `${Math.floor(floatValue)} 1/2` : '1/2'
      );
    }
  }
}
