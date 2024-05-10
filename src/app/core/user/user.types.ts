export interface UserJWTInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  enabled: boolean;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

export interface Authority {
  authority: string;
}

export interface UserAddressInterface {
  cep: string;
  state: string;
  cityId: number;
  number: string;
  street: string;
  complement: string;
  neighborhood: string;
}

export interface RoleInterface {
  id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface MenuInterface {
  menu: string;
  icon: string;
  route: string;
  menuKey: string;
}
