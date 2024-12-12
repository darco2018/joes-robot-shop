import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../catalog/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // add HttpClient to app.module.ts
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    // returns Observable!
    return this.http.get<IProduct[]>('/api/products');
    // request will go to http://localhost:4200/api/products and because of proxy.config.json file
    // it will be redirected to the data server localhost:8081/api/products
  }
}
