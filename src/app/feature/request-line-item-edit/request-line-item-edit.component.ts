import { Component, OnInit } from '@angular/core';
import { RequestLine } from '@model/requestline.class';
import { RequestLinesService } from '@svc/requestlines.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@model/product.class';
import { ProductService } from '@svc/product.service';

@Component({
  selector: 'app-request-line-item-edit',
  templateUrl: './request-line-item-edit.component.html',
  styleUrls: ['./request-line-item-edit.component.css']
})
export class RequestLineItemEditComponent implements OnInit {
  title = 'Request Line Item Edit';
  requestLine: RequestLine;
  products: Product[];
  lineId: number;

  constructor(private productSvc: ProductService,
              private requestLineSvc: RequestLinesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let lineId = params.id;
      this.requestLineSvc.get(lineId).subscribe(resp => {
        this.requestLine = resp as RequestLine;
      });
    });
    this.productSvc.list().subscribe(resp => {
      this.products = resp as Product[];
    });
  }

  edit() {
    this.requestLineSvc.edit(this.requestLine).subscribe(
      resp => {
        this.router.navigate(['request/lines/'+this.requestLine.requestId]);
    },
    err => {
    });
  }
    compareFn(v1: number, v2: number): boolean {
      return v1 === v2;
  }
}

