import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { VendorService } from '@svc/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Request } from '@model/request.class';
import { Vendor } from '@model/vendor.class';
import { UserService } from '@svc/user.service';
import { User } from '@model/user.class';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title = 'Request Edit';
  id: number;
  request: Request; //request were going to edit
  users: User[];
  
  constructor(private requestSvc: RequestService, //
              private userSvc: UserService,       //provides list of users
              private router: Router,             //list of routers
              private route: ActivatedRoute) { }

  ngOnInit() {
    // get the request for the id past from list page
    this.route.params.subscribe(params => this.id = params.id);
    this.requestSvc.get(this.id).subscribe(resp => {
      this.request = resp as Request;
      // get a list of users to use in drop down list
      console.log(this.request);
      this.userSvc.list().subscribe(jresp => {
        this.users = jresp as User[];
        console.log('r-e.c list of users: ');
        for (let u of this.users) {
          console.log(u);
        }
      });
    });
  }
  edit() {
    // set the request userId from request.user.id
    this.request.userId = this.request.user.id;
    // this.request.user = null;
    this.requestSvc.edit(this.request).subscribe(resp => {
      this.request = resp as Request;
      this.router.navigate(['/request/list']);
    });
  }
  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }
}
