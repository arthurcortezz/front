export interface AcsConfirmationConfig {
  title?: string;
  message?: string;
  icon?: {
    show?: boolean;
    name?: string;
    color?:
      | 'primary'
      | 'accent'
      | 'warn'
      | 'basic'
      | 'info'
      | 'success'
      | 'warning'
      | 'error';
  };
  ingredients?: string[];
  actions?: {
    confirm?: {
      show?: boolean;
      label?: string;
      color?: 'primary' | 'accent' | 'warn';
    };
    cancel?: {
      show?: boolean;
      label?: string;
    };
  };
  dismissible?: boolean;
}
