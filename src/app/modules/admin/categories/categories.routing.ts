import { Route } from '@angular/router';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';

export const categoryRoutes: Route[] = [
  {
    path: '',
    data: {
      title: 'Listar',
    },
    component: CategoriesListComponent,
  },
  {
    path: 'criar',
    component: CategoriesFormComponent,
    data: {
      title: 'Criar',
    },
  },
  {
    path: 'editar/:id',
    component: CategoriesFormComponent,
    data: {
      title: 'Editar',
    },
  },
];
