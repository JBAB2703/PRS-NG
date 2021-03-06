import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { Product } from '../../../model/product.class';
import { VendorService } from '../../../service/vendor.service';
import { Vendor } from '../../../model/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title = 'Product Edit';
  id: number;
  product: Product; //product were going to edit
  vendors: Vendor[]; //list of vendors that we can choose from

  constructor(private prdSvc: ProductService, //
              private vndrSvc: VendorService, //provides list of vendors
              private router: Router,         //list of routers
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.id = params.id);
    this.prdSvc.get(this.id).subscribe(resp => {
      this.product = resp as Product;
      console.log(this.product);
      this.vndrSvc.list().subscribe(jresp => {
        this.vendors = jresp as Vendor[];
      });
    });
  }

  edit() {
    this.product.vendorId = this.product.vendor.id;
    this.product.vendor = null;
    this.prdSvc.edit(this.product).subscribe(resp => {
      this.product = resp as Product;
      this.router.navigate(['/product/list']);
    });
  }

  compareFn(v1: number, v2: number): boolean {
    return v1 === v2;
  }
}
