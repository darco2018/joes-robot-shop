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
      // server copy of the cart is loaded into this variable
      next: (cart) => this.cart.next(cart),
    });
  }

  getCart(): Observable<IProduct[]> {
    return this.cart.asObservable();
  }

  add(product: IProduct) {
    const newCart = [...this.cart.getValue(), product];
    this.cart.next(newCart);
     // the call gets exectued only when you subscribe
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('added ' + product.name + ' to cart!'); // you need backticks for interpolation
    });
  }

  remove(product: IProduct) {
    let newCart = this.cart.getValue().filter((i) => i !== product);
    this.cart.next(newCart);
    this.http.post('/api/cart', newCart).subscribe(() => {
      console.log('removed ' + product.name + ' from cart!');
    });
  }
}
