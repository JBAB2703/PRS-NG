import { Component, OnInit } from '@angular/core';
import { Request } from '../../model/request.class';
import { RequestService } from '@svc/request.service';
import { Router } from '@angular/router';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent implements OnInit {
  title = "Request Review";
  requests: Request[];

  constructor(private requestSvc: RequestService,
              private sysSvc: SystemService,
              private router: Router) { }

  ngOnInit() {
    if (this.sysSvc.data.user.loggedIn) {
      this.requestSvc.getReviewableRequestsForUser(this.sysSvc.data.user.instance.id)
        .subscribe(resp => {
          this.requests = resp as Request[];
          console.log(this.requests);
        });
    } else {
      this.router.navigate(['/user/login']);
    }
  }

}
