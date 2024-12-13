import { Component, OnInit } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { CartService } from './cart.service';

@Component({
  selector: 'bot-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
// implements method OnInit
export class CartComponent implements OnInit {
  private cart: IProduct[] = [];
  constructor(private cartService: CartService) { }

  // ngOnInit is a lifecycle hook; called once, after the component’s constructor 
  // has been called and the component’s inputs have been initialized

     // subscribe: This method is used to listen to the observable. 
     // Subscribe takes an object with three optional properties: next, error, and complete
       // observable.subscribe({
      //   next(value) { console.log(value); },
      //   error(err) { console.error('Something went wrong: ' + err); },
      //   complete() { console.log('Done'); }
      // });

      // next: the function that gets executed whenever the bservable emits a new value (card data).  You can think of it as a handler for each emitted item. 
      // When the next function is called, it updates this.cart with the new data.   

  ngOnInit() {
    this.cartService.getCart().subscribe({   
      next: (cart) => (this.cart = cart),
    });
  }

  get cartItems() {
    return this.cart;
  }

  get cartTotal() {
    return this.cart.reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0);
  }

  removeFromCart(product: IProduct) {
    this.cartService.remove(product);
  }

  getImageUrl(product: IProduct) {
    if (!product) return '';
    return '/assets/images/robot-parts/' + product.imageName;
  }
}
