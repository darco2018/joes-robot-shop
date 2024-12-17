import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { TemplateFormControlsComponent } from './user/template-form-controls/template-form-controls.component';

// page created with ng generate module app-routing --flat --module=app

// adding router(path) parameter, eg /catalog/heads catalog/bases etc
// routes are read from top to bottom
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Joe's Robot Shop" },
  { path: 'cart', component: CartComponent, title: "Cart - Joe's Robot Shop" },
  {
    path: 'catalog',
    component: CatalogComponent,
  },
  {
    path: 'catalog/:filter',
    component: CatalogComponent,
    title: "Catalog - Joe's Robot Shop",
  },
  { path: 'sign-in', component: SignInComponent },
  { path: 'form-controls', component: TemplateFormControlsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
// pathMatch: 'full' ensures that the router will only
// redirect to /home if the entire URL matches the empty path ('').

// it is a module just like any other. As a seperate module it is implemented in CLI,
// but actually, it could be
// part of the main module
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)], // rememeber about forRoot(routes)
  exports: [RouterModule], // to make it avaliable in the main module
})
export class AppRoutingModule {}
