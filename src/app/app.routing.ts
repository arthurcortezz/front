import { Route } from '@angular/router';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuard } from './core/auth/guards/role.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/landing/landing.module').then(
            (m) => m.LandingModule
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/auth/sign-in/sign-in.module').then(
            (m) => m.AuthSignInModule
          ),
      },
      {
        path: 'registrar',
        loadChildren: () =>
          import('./modules/auth/sign-up/sign-up.module').then(
            (m) => m.AuthSignUpModule
          ),
      },
    ],
  },
  { path: '-', pathMatch: 'full', redirectTo: 'receitas' },
  {
    path: '',
    canMatch: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'sidebar',
    },
    children: [
      {
        path: 'usuarios',
        canMatch: [RoleGuard],
        data: {
          title: 'Usuários',
          menuKey: 'ROLE_ADMIN',
        },
        loadChildren: () =>
          import('./modules/admin/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'categorias',
        canMatch: [RoleGuard],
        data: {
          title: 'Categorias',
          menuKey: 'ROLE_ADMIN',
        },
        loadChildren: () =>
          import('./modules/admin/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'receitas',
        canMatch: [RoleGuard],
        data: {
          title: 'Receitas',
          menuKey: 'ROLE_USER',
        },
        loadChildren: () =>
          import('./modules/recipes/recipes.module').then(
            (m) => m.RecipesModule
          ),
      },
      {
        path: 'unidades',
        canMatch: [RoleGuard],
        data: {
          title: 'Unidades de medida',
          menuKey: 'ROLE_ADMIN',
        },
        loadChildren: () =>
          import('./modules/admin/unity-types/unity-types.module').then(
            (m) => m.UnityTypesModule
          ),
      },
    ],
  },
];
