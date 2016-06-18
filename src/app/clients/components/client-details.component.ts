import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {ClientService} from '../services/client.service';
import {Client} from '../client.model';

@Component({
    selector: 'client-details',
    template: `
    <div class="w3-row">
      <ul class="w3-ul w3-border">
        <li><h2>{{client.firstName}} {{client.lastName}} <a [routerLink]="['EditClient', {action:'read', id: client.id}]" class="w3-btn light-grey  w3-tiny" href="#">Edit</a></h2></li>
        <li>Group: {{client.group}}</li>
        <li>Email: {{client.email}}</li>
        <li>Phone: {{client.phone}}</li>
        <li>Street: {{client.address}}</li>
        <li>City: {{client.city}}</li>
        <li>Zipcode: {{client.zipcode}}</li>
        </ul>
    </div>

    `,
    directives: [ROUTER_DIRECTIVES]
})

export class ClientDetailsComponent {
  private id;
  private client;

  constructor(
    params: RouteParams,
    private _clientService: ClientService,
    private router: Router
  ){
    this.id = params.get('id');
    this.client = this._clientService.getClient(this.id);
  }
}
