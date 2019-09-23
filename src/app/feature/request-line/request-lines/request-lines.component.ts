import { Component, OnInit } from '@angular/core';
import { RequestService } from '@svc/request.service';
import { RequestLinesService } from '@svc/requestlines.service';
import { ActivatedRoute } from '@angular/router';
import { Request } from '@model/request.class';
import { RequestLine } from '@model/requestline.class';

@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent implements OnInit {
  title = 'Request Lines';
  id: number;
  request: Request;
  lines: RequestLine[];
  
  constructor(private requestSvc: RequestService,
              private requestLinesSvc: RequestLinesService,
              private route: ActivatedRoute) { }

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

  
}
