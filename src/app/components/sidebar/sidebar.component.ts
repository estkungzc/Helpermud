import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'แดชบอร์ด', icon: 'nc-icon nc-bank', class: '' },
  { path: '/air-quality', title: 'ดัชนีคุณภาพอากาศ', icon: 'fab fa-squarespace', class: '' }
];

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
