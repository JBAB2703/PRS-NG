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
  id: number;
  requestLine: RequestLine;
  products: Product[];
  requestId: number;

  constructor(private productSvc: ProductService,
              private requestLineSvc: RequestLinesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let requestid = params.id;
      this.requestLineSvc.get(requestid).subscribe(resp => {
        this.requestLine = resp;
      });
    });
    this.productSvc.list().subscribe(resp => {
      this.products = resp as Product[];
    });
  }
    edit() {
      console.log('sending: ', this.requestLine)
      this.requestLineSvc.edit(this.requestLine).subscribe(
        resp => {
          console.log('response: ', resp)
          this.router.navigate(['request/lines/edit/:id'+this.requestId]);
      },
      err => {
        console.log('error from line create: ', err);
      });
    }
      compareFn(v1: number, v2: number): boolean {
        return v1 === v2;
    }
  }

