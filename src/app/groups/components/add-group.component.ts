import {Component} from '@angular/core';
import {
  Control,
  ControlGroup,
  FormBuilder,
  Validators,
  FORM_DIRECTIVES
} from '@angular/common';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {GroupService} from '../services/group.service';

@Component({
    selector: 'add-group',
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-green">
        <h2>Add Group</h2>
      </div>
      <form [ngFormModel]="form" class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">Group Name</label>
          <input class="w3-input" type="text" [(ngModel)]="newGroup.name" ngControl="name">
        </div>
        <div class="form-group">
        <button (click)="addGroup()" [disabled]="!form.valid" class="w3-btn w3-light-grey">Sumbit data</button>
        </div>
      </form>
    </div>
    `,
    directives:[FORM_DIRECTIVES]
})

export class AddGroupComponent {
  form: ControlGroup;

  name: Control;
  public newGroup: any = {};

  constructor(private _groupService: GroupService, private builder: FormBuilder, private router: Router){
    this.name = new Control(
      "",
      Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
    );

    this.form = builder.group({
      name: this.name
    });
  }

  addGroup(){
    this._groupService.addGroup(this.newGroup);
    this.newGroup = {};
    this.router.navigateByUrl('/groups');
  }
}
