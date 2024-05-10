import { Route } from '@angular/router';
import { UnityTypesComponent } from './components/unity-types-list/unity-types-list.component';
import { UnityTypesFormComponent } from './components/unity-types-form/unity-types-form.component';

export const categoryRoutes: Route[] = [
  {
    path: '',
    data: {
      title: 'Listar',
    },
    component: UnityTypesComponent,
  },
  {
    path: 'criar',
    component: UnityTypesFormComponent,
    data: {
      title: 'Criar',
    },
  },
  {
    path: 'editar/:id',
    component: UnityTypesFormComponent,
    data: {
      title: 'Editar',
    },
  },
];
