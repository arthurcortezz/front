import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'acs-menu',
  templateUrl: './menu.component.html',
})
export class AcsMenuComponent {
  @Input() hideLogo: boolean = false;
  constructor(private readonly router: Router) {}

  clickBack(): void {
    this.router.navigate(['/']);
  }
  scrollToNext(element: string, margin?: boolean) {
    const div = document.getElementById(element);
    if (div) {
      const divRect = div.getBoundingClientRect();
      const yOffset = divRect.top + window.scrollY - (margin ? 60 : 15);
      window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }
  }
}
