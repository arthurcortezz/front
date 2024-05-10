import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { AcsNavigationItem } from '@acs/components/navigation/navigation.types';

@Component({
  selector: 'acs-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcsNavigationComponent {
  @Input() navigation: AcsNavigationItem[];
  @Input() autoCollapse: boolean = true;
  @Input() opened: boolean = false;
  @Output() hoveredEvent: EventEmitter<any> = new EventEmitter();

  public hovered: boolean = false;
  private hoveredTimeout: any = null;
  private mode = null;

  constructor() {}

  @HostBinding('class') get classList(): any {
    return {
      'acs-navigation-hover': this.hovered,
      'acs-navigation-mode-over': this.mode === 'over',
      'acs-navigation-opened': this.opened,
    };
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.hoveredTimeout = setTimeout(() => {
      this.hovered = true;
      this.hoveredEvent.emit(this.hovered);
    }, 400);
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    if (this.hoveredTimeout) {
      clearTimeout(this.hoveredTimeout);
    }

    setTimeout(() => {
      this.hovered = false;
      this.hoveredEvent.emit(this.hovered);
    }, 400);
  }

  public trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
