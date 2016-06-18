import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Group} from '../group.model';
let firebase = require("firebase/app");
@Injectable()
export class GroupService{
  private groups;
  private group;
  private fbRef: Firebase;
  private groupRef: Firebase;
  private clientRef: Firebase;

  constructor(){
    this.fbRef = firebase.database();
    this.groupRef = this.fbRef.ref('groups');
    this.group = {};
  }

  addGroup(newGroup): void{
    this.groupRef.push({
      name: newGroup.name
    });
    return;
  }

  getGroups(): Observable<Group>{
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

  deleteGroup(id){
    let delRef = this.fbRef.ref('groups/'+id);
    delRef.remove();
  }

  getGroup(id){
    let editRef = this.fbRef.ref('groups/'+id);
    var self = this;
    editRef.on('value', function(snapshot){
      self.group = {
        id: snapshot.key,
        name: snapshot.val().name
      }
    });
    return self.group;
  }

  editGroup(newGroup): void {
    let updateRef = this.fbRef.ref('groups/'+newGroup.id);
    updateRef.update({
      name: newGroup.name
    });
    return;
  }
}
