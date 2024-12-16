import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

// page created with ng generate module app-routing --flat --module=app

 // adding router(path) parameter, eg /catalog/heads catalog/bases etc
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
  {
    path: 'catalog/:filter',
    component: CatalogComponent,
    title: "Catalog - Joe's Robot Shop",
  },
  {path: 'sign-in', component: SignInComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];
// pathMatch: 'full' ensures that the router will only 
// redirect to /home if the entire URL matches the empty path ('').

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
