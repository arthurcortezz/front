import { Component, Input } from '@angular/core';
import { AcsNavigationItem } from '@acs/components/navigation';
import { acsAnimations } from '@acs/animations';

@Component({
  animations: acsAnimations,
  selector: 'acs-navigation-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class AcsNavigationItemComponent {
  @Input() item: AcsNavigationItem;
  @Input() hovered: boolean;

  constructor() {}
}
