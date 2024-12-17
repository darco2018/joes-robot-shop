import { Component, inject } from '@angular/core';
import { IProduct } from './product.model';
import { CartService } from '../cart/cart.service';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit() { // lifecycle hook called when you REFRESH localhost:4200 in the browser !!!
   
    const observable = this.productSvc.getProducts();
    observable.subscribe((products) => {
      this.products = products;
    });

    // solution 1
    // shapshot - point-in-time info about the current URL
    // params - has all route params in the URL
    // this solution works in many cases when we link to this component from another componenet.
    // But it will not work when we link this compon to itself (the componenet will not be reloaded)
    // So the buttons on the /catalog page will not change the URL if clicked
    // The solution worked with  <a class="button" (click)="filter = 'Heads'">Heads</a>
    // on the catalog.component.html
    //this.filter = this.route.snapshot.params['filter'];

    // solution 2
    // subscription that listen to change of the route parameters
    // when a new params object is published, the callback will be called

    // with query parameters, catalog?filter=Heads, replace params with queryPrams in next line
    // (full description in home.componenet.html)
    this.route.params.subscribe(params => {
      this.filter = params['filter'] ?? ''; // if filter not provided it will be set to empty string
    });
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product) => product.category === this.filter);
  }
}
