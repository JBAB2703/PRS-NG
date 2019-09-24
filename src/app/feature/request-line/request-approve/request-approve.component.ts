import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { RequestLinesService } from '@svc/requestlines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '@model/request.class';
import { RequestLine } from '@model/requestline.class';

@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {
  title = 'Request Approval';
  id: number;
  request: Request;
  lines: RequestLine[];
  reason: string = "";
  
  constructor(private requestSvc: RequestService,
              private requestLinesSvc: RequestLinesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.requestSvc.get(this.id).subscribe(resp => {
      this.request = resp as Request;
    });
    this.requestLinesSvc.list().subscribe(resp => {
      let allLines = resp as RequestLine[];
      this.lines = allLines.filter(line => line.requestId == this.id);
    });
  }

  approve() {
    this.requestSvc.approveRequest(this.id).subscribe(resp => {
      this.router.navigate(['/request/review']);
    })
  }

  reject() {
    console.log('rejected because: ', this.reason)
    this.requestSvc.rejectRequest(this.id).subscribe(resp => {
      this.router.navigate(['/request/review']);
    })
  }

}
