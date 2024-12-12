import { Component, Input } from '@angular/core';
import { IProduct } from '../catalog/product.model';

@Component({
  selector: 'bot-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  // The exclamation mark (!) is the non-null assertion operator. It tells TypeScript that this property
  //will definitely be assigned a value at some point, even if it is not initialized immediately.
  //This is useful when you know that the property will be initialized later, but
  //TypeScript’s strict null checks would otherwise raise an error.

  // IMPORTANT: here: product is passed in the html selector tag from the parent componenet
  @Input() product!: IProduct;

  addToCart(product: IProduct) {
    //'Method not implemented.'
    console.log('addTocart - Method not implemented');
  }
  // no function keyword!!
  getImagetUrl(product: IProduct) {
    return '/assets/images/robot-parts/' + product.imageName;
  }

  getDiscountedClasses(product: IProduct) {
    if (product.discount > 0) {
      return 'strikethrough green'; // we could also return an array
    } else {
      return '';
    }

    // I can just return object:
    // return {strikethrough: product.discount > 0, green: product.discount > 0};
  }
}
