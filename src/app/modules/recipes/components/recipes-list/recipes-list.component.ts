import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import {
  AcsTableInterface,
  AcsTablePaginatorInterface,
  AcsTableSortInterface,
} from '@acs/components/table';
import { AcsToastService } from '@acs/services/toast';
import { AcsHeaderActionInterface } from '@acs/components/header';

import { RecipesService } from '../../recipes.service';
import { RecipePaginatedInterface } from '../../recipes.types';
import { AcsVisualizeService } from '@acs/services/visualize';
import { AcsConfirmationService } from '@acs/services/confirmation';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public data: RecipePaginatedInterface = null;
  public config: AcsTableInterface = {
    title: 'Receitas',
    headers: [
      { name: 'Nome', key: 'name' },
      { name: 'Ingredientes', key: 'ingredients' },
      { name: 'Criado em', key: 'createdAt' },
      { name: 'Modificado em', key: 'updatedAt' },
    ],
    content: [
      { type: 'field', key: 'name' },
      { type: 'length', key: 'ingredients' },
      { type: 'timestamp', key: 'createdAt' },
      { type: 'timestamp', key: 'updatedAt' },
    ],
    actions: true,
    view: true,
    selection: false,
    searchable: false,
    searchableConfig: {
      requestPagination: true,
    },
    paginator: false,
    paginatorConfig: {
      requestPagination: true,
    },
    sortable: false,
    sortConfig: {
      requestPagination: true,
    },
  };
  public sort: AcsTableSortInterface;
  public paginator: AcsTablePaginatorInterface;
  public selection = new SelectionModel<number>(true, []);
  private readonly unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly service: RecipesService,
    private readonly toastService: AcsToastService,
    private readonly visualizeService: AcsVisualizeService,
    private readonly confirmationService: AcsConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: RecipePaginatedInterface) => {
        this.data = res;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleAction(data: AcsHeaderActionInterface): void {
    switch (data.action) {
      case 'form':
        if (!data.id) {
          this.router.navigateByUrl('receitas/criar');
        } else {
          this.router.navigateByUrl(`receitas/editar/${data.id}`);
        }
        break;
      case 'observe':
        const recipe = this.data.rows.find((e) => e.id === data.id);
        this.visualizeService.open({
          title: recipe.name,
          message: recipe.description,
          icon: {
            show: true,
            name: recipe.image,
            color: 'warn',
          },
          ingredients: recipe.ingredients.map(
            (e) =>
              `${
                e.unityValue % 0.5 === 0
                  ? e.unityValue > 1
                    ? `${Math.floor(e.unityValue)} e 1/2`
                    : '1/2'
                  : e.unityValue
              }  ${e.unityType.name} de ${e.name}`
          ),
          actions: {
            confirm: {
              show: true,
              label: 'Voltar',
              color: 'primary',
            },
          },
        });
        break;
      case 'delete':
        const dialogRef = this.confirmationService.open();

        dialogRef.afterClosed().subscribe((res) => {
          if (res === 'confirmed') {
            this.service.delete(data.id).subscribe({
              next: (res) => {
                this.getAll();
                this.toastService.handleMessage(res, null, {
                  handleRequest: true,
                });
              },
              error: (error) => {
                this.toastService.handleMessage(
                  error,
                  'Não foi possível remover a receita.',
                  { handleRequest: true }
                );
              },
            });
          }
        });
        break;
    }
  }

  handleSort(event: AcsTableSortInterface): void {
    this.sort = event;
    this.getAll();
  }

  handlePaginator(event: AcsTablePaginatorInterface): void {
    this.paginator = event;
    this.getAll();
  }
}
