import { Component, OnInit } from '@angular/core';
import { Request } from '@model/request.class';
import { RequestCreate } from '@model/requestcreate.class';
import { RequestService } from '@svc/request.service';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  request: RequestCreate = new RequestCreate();
  response: Request;
  title: string = 'Create Request';

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (this.sysSvc.data.user.loggedIn) {
      this.request.userId = this.sysSvc.data.user.instance.id;
    } else {
      this.router.navigate(['/user/login']);
    }
   }

  create() {
    console.log(this.request)
    this.requestSvc.create(this.request).subscribe(
      resp => {
        this.response = resp as Request;
        this.router.navigate(['/request/list']);
    },
    err => {
      console.log(err);
    }
    );
  }
}
