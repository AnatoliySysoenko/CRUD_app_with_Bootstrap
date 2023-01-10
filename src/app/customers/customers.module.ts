import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersHostComponent } from './components/customers-host/customers-host.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomersHostComponent,
    CustomersListComponent,
    CustomerDetailsComponent
  ],
  exports: [
    CustomersHostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CustomersModule {
}
