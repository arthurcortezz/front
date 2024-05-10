import { Subject, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { UserJWTInterface } from '../../../core/user/user.types';
import { NavigationService } from '../../../core/navigation/navigation.service';
import { NavigationInterface } from '../../../core/navigation/navigation.types';

import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'sidebar-layout',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarLayoutComponent implements OnInit, OnDestroy {
  public title = '';
  public companyTitle = null;
  public isMobile: boolean = false;
  public hovered: boolean = false;
  public navigation: NavigationInterface[];

  private currentRoute = '';
  private menus: NavigationInterface[] = [
    {
      menu: 'Usuários',
      route: 'usuarios',
      icon: 'mat_outline:group',
      menuKey: 'ROLE_ADMIN',
    },
    {
      menu: 'Receitas',
      route: 'receitas',
      icon: 'mat_outline:recipe',
      menuKey: 'ROLE_USER',
    },
    {
      menu: 'Categorias',
      route: 'categorias',
      icon: 'uil:menu-round',
      menuKey: 'ROLE_ADMIN',
    },
    {
      menu: 'Unidades de medida',
      route: 'unidades',
      icon: 'uil:menu-round',
      menuKey: 'ROLE_ADMIN',
    },
  ];
  private readonly unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private readonly router: Router,
    private readonly service: UserService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
    this.currentRoute = this.router.url.split('/')[1];

    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.url.split('/')[1];
          const title = this.navigation.find((menu) =>
            menu.route.includes(this.currentRoute)
          );
          if (title) this.title = title.menu;
        }
      });
  }

  ngOnInit(): void {
    this.service.user$.subscribe((user: UserJWTInterface) => {
      this.navigation = this.menus.filter((menu) =>
        user.authorities.some((authority) =>
          menu.menuKey.includes(authority.authority)
        )
      );

      const title = this.menus.find((menu) =>
        menu.route.includes(this.currentRoute)
      );
      this.title = title ? title.menu : '';
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next(null);
    this.unsubscribeAll.complete();
  }

  handleHovered(event: boolean): void {
    this.hovered = event;
  }
}
