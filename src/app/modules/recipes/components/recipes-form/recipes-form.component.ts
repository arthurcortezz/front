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
  public selectedFileName: string = '';
  public unityTypes: UnityTypeInterface[];
  public categories: CategoryInterface[];

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

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleSaveOrUpdate(): void {
    this.form.disable();
    const formValue = {
      ...this.form.value,
    };

    if (this.id) {
      this.service
        .update(this.id, { ...formValue, id: this.id })
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
        .create(formValue)
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
        image: ['', []],
        name: ['', [Validators.required]],
        unityType: ['', [Validators.required]],
        unityValue: ['', [Validators.required]],
      })
    );
  }

  deleteIngredientForm(index: number): void {
    const ingredientsArray = this.form.get('ingredients') as UntypedFormArray;
    ingredientsArray.removeAt(index);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      // Agora você pode fazer algo com o arquivo, como enviá-lo para um servidor
    }
  }
}
