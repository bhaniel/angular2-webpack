import {Component} from '@angular/core';
import {
  Control,
  ControlGroup,
  FormBuilder,
  Validators,
  FORM_DIRECTIVES
} from '@angular/common';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from '@angular/router-deprecated';
import {ClientService} from '../services/client.service';
import {Client} from '../client.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'edit-client',
    template: `
    <div class="w3-card-4">
      <div class="w3-container w3-green">
        <h2>Edit Client</h2>
      </div>
      <form [ngFormModel]="form" class="w3-padding-16">
        <div class="form-group">
          <label class="w3-label">First Name</label>
          <input class="w3-input" type="text" [(ngModel)]="client.firstName" ngControl="firstName">
        </div>
        <div class="form-group">
          <label class="w3-label">Last Name</label>
          <input class="w3-input" type="text" [(ngModel)]="client.lastName">
        </div>
        <div class="form-group">
          <label class="w3-label">Group</label>
          <select class="w3-select" [(ngModel)]="client.group">
            <option value="" disabled selected>Choose your option</option>
            <option *ngFor="#group of groups" [value]="group.name">{{group.name}}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="w3-label">Email</label>
          <input class="w3-input" type="text" [(ngModel)]="client.email" ngControl="email">
        </div>
        <div class="form-group">
          <label class="w3-label">Phone</label>
          <input class="w3-input" type="text" [(ngModel)]="client.phone">
        </div>
        <div class="form-group">
          <label class="w3-label">Address</label>
          <input class="w3-input" type="text" [(ngModel)]="client.address">
        </div>
        <div class="form-group">
          <label class="w3-label">City</label>
          <input class="w3-input" type="text" [(ngModel)]="client.city">
        </div>
        <div class="form-group">
          <label class="w3-label">State</label>
          <input class="w3-input" type="text" [(ngModel)]="client.state">
        </div>
        <div class="form-group">
          <label class="w3-label">Zipcode</label>
          <input class="w3-input" type="text" [(ngModel)]="client.zipcode">
        </div>
        <div class="form-group">
        <button (click)="editClient(client.id)" [disabled]="!form.valid" class="w3-btn w3-light-grey">Sumbit data</button>
        </div>
      </form>
    </div>
    `
})

export class EditClientComponent {
  form: ControlGroup;
  firstName: Control;
  email: Control;
  public newClient: any = {};
  private id;
  private client;
  public groups;
  public subscription;

  constructor(
    params: RouteParams,
    private _clientService: ClientService,
    private builder: FormBuilder,
    private router: Router) {

    this.groups = [];
    this.id = params.get('id');
    this.client = this._clientService.getClient(this.id);

		this.firstName = new Control(
			"",
			Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
		);

    this.email = new Control(
			"",
			Validators.compose([
        Validators.required
      ])
		);

		this.form = builder.group({
			firstName:  this.firstName,
      email: this.email
		});
	}

  ngOnInit() {
    this.subscription = this._clientService.getGroups().subscribe(group => {
      this.groups.push(group);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editClient(id) {
    this.newClient = {
      id: id,
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      group: this.client.group,
      email: this.client.email,
      phone: this.client.phone,
      address: this.client.address,
      city: this.client.city,
      state: this.client.state,
      zipcode: this.client.zipcode
    }
    this._clientService.editClient(this.newClient);
    this.newClient = {};
    this.router.navigateByUrl('/clients');
  }
}
