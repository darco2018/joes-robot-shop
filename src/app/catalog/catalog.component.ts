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
    //this.filter = this.route.snapshot.params['filter']; and <a class="button" (click)="filter = 'Heads'">Heads</a> in template
    // shapshot - point-in-time info about the current URL
    // params -an Observable which has all route params in the URL
    // this solution works in many cases when we link to this component from another componenet(= click on buttons on the same componenet)
    // But it will not work when we link this component to itself (the componenet will not be reloaded)
    // So the buttons on the /catalog page will not change the filter in the URL if clicked from Bases to Heads, etc.    

    // solution 2
    // this.route.params.subscribe listesn to change of the route parameters
    // when a new params object is published, the callback will be called

    // with query parameters, catalog?filter=Heads, replace params with queryPrams in next line
    // (full description in home.componenet.html)
    this.route.params.subscribe({
      next: params => { this.filter = params['filter'] ?? '';}, // if filter not provided it will be set to empty string  
           
    }); 
    
    // this part below DOES NOT get called when params change(a button is clicked) 
    console.log('products: ' + this.products);
    console.log('filter: ' + this.filter);
  }

  addToCart(product: IProduct) {
    this.cartSvc.add(product);
    this.router.navigate(['/cart']);
  }

  // the only way to get up-to-date products is to call products directly from html template like this:
  getFilteredProducts() {
    return this.filter === ''
      ? this.products
      : this.products.filter((product) => product.category === this.filter);
  }

}
