import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AcsConfirmationService } from '@acs/services/confirmation';
import {
  AcsTableInterface,
  AcsTablePaginatorInterface,
  AcsTableSortInterface,
} from '@acs/components/table';
import { AcsToastService } from '@acs/services/toast';
import { AcsHeaderActionInterface } from '@acs/components/header';

import { CategoriesService } from '../../categories.service';
import { CategoryPaginatedInterface } from '../../categories.types';

@Component({
  selector: 'recipes-list',
  templateUrl: './categories-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  public data: CategoryPaginatedInterface = null;
  public config: AcsTableInterface = {
    title: 'Categorias',
    headers: [
      { name: 'Nome', key: 'name' },
      { name: 'Criado em', key: 'createdAt' },
      { name: 'Modificado em', key: 'updatedAt' },
    ],
    content: [
      { type: 'field', key: 'name' },
      { type: 'timestamp', key: 'createdAt' },
      { type: 'timestamp', key: 'updatedAt' },
    ],
    actions: true,
    searchable: false,
    searchableConfig: {
      requestPagination: true,
    },
    selection: false,
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
    private readonly service: CategoriesService,
    private readonly toastService: AcsToastService,
    private readonly confirmationService: AcsConfirmationService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: CategoryPaginatedInterface) => {
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
          this.router.navigateByUrl('categorias/criar');
        } else {
          this.router.navigateByUrl(`categorias/editar/${data.id}`);
        }
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
                  'Não foi possível remover a categoria.',
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
