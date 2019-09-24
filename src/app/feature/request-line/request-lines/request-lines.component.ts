import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { RequestLinesService } from '@svc/requestlines.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '@model/request.class';
import { RequestLine } from '@model/requestline.class';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title = 'Request Line Items';
  id: number;
  request: Request;
  lines: RequestLine[];
  
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

  submit() {
    this.requestSvc.submitForReview(this.id).subscribe(resp => {
      this.router.navigate(['/request/list']);
    })
  }

  delete(lineId: number){
  this.requestLinesSvc.delete(lineId).subscribe(resp => {
    // delete from lines array where lineId == line.id
    this.lines = this.lines.filter(line => line.id !== lineId);
  })
}
}
