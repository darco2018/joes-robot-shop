import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { IProduct } from '../catalog/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
// a copy of the cart is now stored here

  // a type of Subject from RxJS that holds a current value and emits it to new subscribers immediately upon subscription. 
  // a type of Observvable, uset to always emit THE LATEST value
  private cart: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);

  constructor(private http: HttpClient) {
    this.http.get<IProduct[]>('/api/cart').subscribe({
      next: (serverCart) => this.cart.next(serverCart),  // server copy of the cart is loaded into this.cart observable
    }); // The wrong assignment this.cart = serverCart would overwrite the entire cart property 
        // instead of updating the observable
        // This means you wouldn't have the observable handling the state change anymore 
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable(); // Creates a new Observable with this Subject as the source. 
  }

  add(product: IProduct) {
    // creates a new array called newCart by spreading the current values of the this.cart observable
    //(obtained via this.cart.getValue()) and appending the new product
    const newCart = [...this.cart.getValue(), product]; // same as this.cart.push(product)

    // UI UPDATE
    // updates the observable cart with the new array newCart
     // next is a method that emits a new value to all subscribers of the observable.
     // This allows other parts of the application to react to the change in the cart's state 
     // (for example, updating the UI to reflect the new cart contents).
     // this.cart is of type BehaviorSubject - with next() you retrieve the most recent value 
     // that the BehaviorSubject holds.
    this.cart.next(newCart);

     // the call gets exectued only when you subscribe. 
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + product.name + ' to cart!'); // you need backticks for interpolation
    });
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);  // updates the observable cart with the new array; updates UI as well
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}
