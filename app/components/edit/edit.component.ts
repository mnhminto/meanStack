import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import { MatSnackBar} from '@angular/material';

import { IssueService} from '../../issue.service';
import { Issue} from '../../issue.model';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  issue : any = {};
  updateForm : FormGroup;

  constructor(private issueService: IssueService, private formBldr:FormBuilder, private router: Router, private actRouter: ActivatedRoute, private snackBar:MatSnackBar) { 
    this.createForm();
  }

  createForm(){
    this.updateForm= this.formBldr.group({
      title : ['',Validators.required],
      responsible: '',
      description:'',
      severity:'',
      status:''
    });
  } 
  populateCurrentValue(){
    this.actRouter.params.subscribe(params => {
      this.id = params.id;
      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);

      });

    });
  }


  ngOnInit() {
    this.populateCurrentValue();
  }

  // call updateIssue from issue.service.ts

  updateIssue(title, responsible, description, service, status){
    this.issueService.updateIssue(this.id, title, responsible, description, service, status).subscribe(()=>{
      this.snackBar.open('Issue Updated Successfully', 'OK', {
        duration:3000
      });
      this.router.navigate(['/list']);
    });
  }

}
