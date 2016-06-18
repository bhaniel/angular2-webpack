import {Component, OnInit, OnDestroy} from '@angular/core';
import {Client} from '../client.model';
import {ClientService} from '../services/client.service';
import {Subscription} from 'rxjs/Subscription';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {FilterArrayPipe} from '../pipes/filter.pipe';

@Component({
    selector: 'client-list',
    template: `
      <h2>{{title}}</h2>
      <form>
        <input class="w3-input" type="text" [(ngModel)]="searchText" placeholder="Search Clients...">
      </form>
      <div *ngIf="clients">
      <table *ngIf="clients" class="w3-table w3-bordered w3-striped">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
        <tr *ngFor="let client of clients  | filter:searchText">
          <td><a [routerLink]="['ClientDetails', {action:'read', id: client.id}]">{{client.firstName}} {{client.lastName}}</a></td>
          <td>{{client.email}}</td>
          <td>{{client.phone}}</td>
          <td>
          <a [routerLink]="['EditClient', {action:'read', id: client.id}]" class="w3-btn w3-green">Edit</a>
          <button (click)="deleteClient(client.id)" class="w3-btn w3-red" >Delete</button>
          </td>
        </tr>
      </table>
      </div>
    `,
    directives:[ROUTER_DIRECTIVES],
    pipes:[FilterArrayPipe]
})

export class ClientListComponent {
  public clients: Client[] = [];
  public subscription;
    public title:string;
  constructor(private _clientService: ClientService){
    this.title = "Clients";
  }

  ngOnInit() {
    this.subscription = this._clientService.getClients().subscribe(client => {
        this.clients.push(client);
   });
 }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClient(id){
    this.clients.forEach((c, index) => {
      if(c.id == id) {this.clients.splice(index, 1)}
    });
    this._clientService.deleteClient(id);
  }

}
