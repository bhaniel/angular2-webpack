import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from '@angular/router-deprecated';

@Component({
    selector: 'dashboard',
    template: `
    <div class="w3-container w3-pale-green w3-leftbar w3-border-green w3-padding-16">
      <h2>Dashboard</h2>
      <p>Welcome to the ClientTracker dashboard. Click below to easily manage your clients and client groups</p>
      <a [routerLink]="['Clients']" class="w3-btn w3-light-grey">Clients</a>
      <a [routerLink]="['Groups']" class="w3-btn w3-light-grey">Groups</a>
    </div>
    `,
    directives:[ROUTER_DIRECTIVES]
})

export class DashboardComponent { }
