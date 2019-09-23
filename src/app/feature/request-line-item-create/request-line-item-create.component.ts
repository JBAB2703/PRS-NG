import { Component, OnInit } from '@angular/core';
import { RequestLine } from '@model/requestline.class';
import { RequestLinesService } from '@svc/requestlines.service';
import { ProductService } from '@svc/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@model/product.class';

@Component({
  selector: 'app-request-line-item-create',
  templateUrl: './request-line-item-create.component.html',
  styleUrls: ['./request-line-item-create.component.css']
})
export class RequestLineItemCreateComponent implements OnInit {
  requestId: number;
  line: RequestLine = new RequestLine();
  title = 'Request Line Item Create';
  products: Product[];

  constructor(private productSvc: ProductService,
              private requestLineSvc: RequestLinesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.requestId = params.id);
    this.line.requestId = this.requestId;
    this.productSvc.list().subscribe(resp => {
      this.products = resp as Product[];
    });
  }

  create() {
    console.log('sending: ', this.line)
    this.requestLineSvc.create(this.line).subscribe(
      resp => {
        console.log('response: ', resp)
        this.router.navigate(['/request/lines/'+this.requestId]);
    },
    err => {
      console.log('error from line create: ', err);
    }
    );
  }
  
  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }

}
