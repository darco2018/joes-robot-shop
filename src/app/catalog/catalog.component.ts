import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  filter: String = ''; // click will change the value of filter and activate  getFilteredProducts(), which uses this variable
  products: IProduct[] = []; // IProduct here does not allow for null values in the array!

  // alternate to constructor injection
  //private cartSvc: CartService = inject(CartService);
  //private productSvc: ProductService = inject(ProductService);

  constructor(
    private cartSvc: CartService,
    private productSvc: ProductService
  ) {}

  // lifecycle method
  // the call will be made when you REFRESH localhost:4200 in the browser !!!
  ngOnInit() {
    //always rememer to subscribe to observable
    const observable = this.productSvc.getProducts();
    observable.subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product) => product.category === this.filter);
  }
}
