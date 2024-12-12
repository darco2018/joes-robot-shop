import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: IProduct[] = [];

  constructor(private http: HttpClient) {}

  add(product: IProduct) {
    this.cart.push(product);
    // the call gets exectued only when you subscribe
    this.http.post('/api/cart', this.cart).subscribe(()=>{
      console.log(`Server added product ${product.name} to cart`); // you need backticks for interpolation
    })
    
  }
}
