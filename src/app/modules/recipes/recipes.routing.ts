import { Route } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipesFormComponent } from './components/recipes-form/recipes-form.component';

export const recipeRoutes: Route[] = [
  {
    path: '',
    data: {
      title: 'Listar',
    },
    component: RecipesListComponent,
  },
  {
    path: 'criar',
    component: RecipesFormComponent,
    data: {
      title: 'Criar',
    },
  },
  {
    path: 'editar/:id',
    component: RecipesFormComponent,
    data: {
      title: 'Editar',
    },
  },
];
