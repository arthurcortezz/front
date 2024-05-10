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

import {
  UserFilterInterface,
  UserInterface,
  UserPaginatedInterface,
} from '../../users.types';
import { UsersService } from '../../users.service';

@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersListComponent implements OnInit, OnDestroy {
  public data: UserPaginatedInterface = null;
  public config: AcsTableInterface = {
    title: 'Usuários',
    headers: [
      { name: 'Nome', key: 'name' },
      { name: 'E-mail', key: 'email' },
      { name: 'Criado em', key: 'createdAt' },
      { name: 'Modificado em', key: 'updatedAt' },
    ],
    content: [
      { type: 'field', key: 'name' },
      { type: 'field', key: 'email' },
      { type: 'timestamp', key: 'createdAt' },
      { type: 'timestamp', key: 'updatedAt' },
    ],
    actions: true,
    searchable: true,
    searchableConfig: {
      requestPagination: true,
    },
    selection: true,
    paginator: true,
    paginatorConfig: {
      requestPagination: true,
    },
    sortable: true,
    sortConfig: {
      requestPagination: true,
    },
  };
  public sort: AcsTableSortInterface;
  public paginator: AcsTablePaginatorInterface;
  public selection = new SelectionModel<number>(true, []);
  private readonly unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private readonly confirmationService: AcsConfirmationService,
    private readonly router: Router,
    private readonly toastService: AcsToastService,
    private readonly service: UsersService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.service
      .findAll()
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res: UserPaginatedInterface) => {
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
          this.router.navigateByUrl('usuarios/criar');
        } else {
          this.router.navigateByUrl(`usuarios/editar/${data.id}`);
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
                  'Não foi possível remover o usuário.',
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
