import {Injectable} from '@angular/core';
import {Observable}     from 'rxjs/Observable';
import {Client} from '../client.model';
import {Group} from '../../groups/group.model';
let firebase = require("firebase/app");
@Injectable()
export class ClientService{
  private clients;
  private client;
  private fbRef: Firebase;
  private groupRef: Firebase;
  private clientRef: Firebase;
  group = 'Web Design';

  constructor(){
    this.fbRef = firebase.database();
    this.clientRef = this.fbRef.ref('clients');
    this.client = {};
    this.groupRef = this.fbRef.ref('groups');
  }

  addClient(newClient): void{
    this.clientRef.push({
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      group: this.group,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      city: newClient.city,
      state: newClient.state,
      zipcode: newClient.zipcode
    });
    return;
  }

  getClients(): Observable<Client> {
    return Observable.create(observer => {
      let listener = this.clientRef.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Client(
          snapshot.key,
          data.firstName,
          data.lastName,
          data.group,
          data.email,
          data.phone,
          data.address,
          data.city,
          data.state,
          data.zipcode
        ));
      }, observer.error);
    });
  }

  getGroups(): Observable<Group> {
  return Observable.create(observer => {
    let listener = this.groupRef.on('child_added', snapshot => {
      let data = snapshot.val();
      observer.next(new Group(
        snapshot.key,
        data.name
      ));
    }, observer.error);
  });
}

  getClient(id){
    let editRef = this.fbRef.ref('clients/'+id);
    var self = this;
    editRef.on("value", function(snapshot){
      self.client = {
        id: snapshot.key,
        firstName: snapshot.val().firstName,
        lastName: snapshot.val().lastName,
        group: snapshot.val().group,
        email: snapshot.val().email,
        phone: snapshot.val().phone,
        address: snapshot.val().address,
        city: snapshot.val().city,
        state: snapshot.val().state,
        zipcode: snapshot.val().zipcode
      }
    });
    return self.client;
  }

  deleteClient(id){
    let delRef = this.fbRef.ref('clients/'+id);
    delRef.remove();
    console.log('Deleted client with ID - '+id);
  }

  editClient(newClient): void {
    let updateRef = this.fbRef.ref('clients/'+newClient.id);
    updateRef.update({
      firstName: newClient.firstName,
      lastName: newClient.lastName,
      group: newClient.group,
      email: newClient.email,
      phone: newClient.phone,
      address: newClient.address,
      city: newClient.city,
      state: newClient.state,
      zipcode: newClient.zipcode
    });
    return;
  }
}
