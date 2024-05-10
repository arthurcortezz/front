export interface AcsNavigationItem {
  id?: string;
  menu?: string;
  icon?: string;
  route?: string;
}

export type AcsNavigationAppearance = 'default' | 'compact' | 'dense' | 'thin';

export type AcsNavigationMode = 'over' | 'side';

export type AcsNavigationPosition = 'left' | 'right';
