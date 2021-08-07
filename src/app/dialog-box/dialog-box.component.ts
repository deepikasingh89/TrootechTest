import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersData } from '../userList';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action:string;
  local_data:any;
  taskNameValidClass:any='';
  dateValidClass:any='';
  statusValidClass:any='';

  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) 
  {
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    let allValid=true;
    if(!this.local_data.taskName){
      this.taskNameValidClass='text-danger';
      allValid=false;
    }else{
      this.taskNameValidClass='';
    }
    if(!this.local_data.date){
      this.dateValidClass='text-danger';
      allValid=false;
    }else{
      this.dateValidClass='';
    }
    if(!this.local_data.status){
      this.statusValidClass='text-danger';
      allValid=false;
    }else{
      this.statusValidClass='';
    }
    if(allValid){
      this.dialogRef.close({event:this.action,data:this.local_data});
    }
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}