import { Component, OnInit } from '@angular/core';

import { Router} from '@angular/router';
//import { MatTableDataSource} from '@angular/material';
//import { MatTableDataSource} from '@angular/material/table';

import { Issue} from '../../issue.model';
import { IssueService} from '../../issue.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColums = ['title','responsible','severity','status','action'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
   this.fetchIssues();
  }

  fetchIssues(){
    this.issueService
        .getIssues()
        .subscribe((data:Issue[]) => {
          this.issues = data;
          console.log('Data Requested....');
          console.log(this.issues);
        });
  }


  editIssue(id){
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id){
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
