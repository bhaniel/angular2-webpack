import {Component, OnInit, OnDestroy} from '@angular/core';
import {Group} from '../group.model';
import {GroupService} from '../services/group.service';
import {Subscription} from 'rxjs/Subscription';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from '@angular/router-deprecated';

@Component({
    selector: 'group-list',
    template: `
      <h2>Groups</h2>
      <div *ngIf="groups">
        <table class="w3-table w3-bordered w3-striped">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th></th>
          </tr>
          <tr *ngFor="let group of groups">
            <td>{{group.id}}</td>
            <td>{{group.name}}</td>
            <td>
              <a [routerLink]="['EditGroup', {action:'read', id: group.id}]" class="w3-btn w3-green">Edit</a>
              <button (click)="deleteGroup(group.id)" class="w3-btn w3-red">Delete</button>
            </td>
          </tr>
        </table>
      </div>
    `,
    directives:[ROUTER_DIRECTIVES]
})

export class GroupListComponent implements OnInit, OnDestroy{
  public groups: Group[] = [];
  public subscription;

  constructor(private _groupService: GroupService){

  }

  ngOnInit(){
    this.subscription = this._groupService.getGroups().subscribe(group => {
      this.groups.push(group);
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  deleteGroup(id){
    this.groups.forEach((g, index) => {
      if(g.id == id) {this.groups.splice(index, 1)}
    });
    this._groupService.deleteGroup(id);
  }
}
