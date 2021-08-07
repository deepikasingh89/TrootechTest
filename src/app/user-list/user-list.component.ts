import { Component,ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { UsersData } from '../userList';

const USER_DATA: UsersData[] = [];

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  displayedColumns: string[] = ['taskName','date','status', 'action'];
  dataSource = USER_DATA;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action,obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data:obj,
      disableClose: true 
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }
  addRowData(row_obj){
    var d = new Date();
    console.log()
    this.dataSource.push({
      id:d.getTime(),
      taskName:row_obj.taskName,
      date:row_obj.date,
      status:row_obj.status
    });
    this.table.renderRows();
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.taskName = row_obj.taskName;
        value.date = row_obj.date;
        value.status = row_obj.status;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
}
