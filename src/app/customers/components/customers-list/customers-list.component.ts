import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { Observable } from 'rxjs';
import { CustomerInterface } from '../../../shared/types/customer.interface';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customer$!: Observable<CustomerInterface[]>;
  isEditPos!: number | null;
  isNotChanged!: boolean;
  private tempCustomer!: CustomerInterface;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.customer$ = this.httpService.getData();
    this.resetEditStatus();
  }

  editCustomer(i: number): void {
    this.isEditPos = i;
  }

  cancelEdit(): void {
    this.resetEditStatus();
  }

  saveCustomer(customer: CustomerInterface, i: number): void {
    const mergedCustomer = this.mergeCustomerProps(customer, this.tempCustomer);
    this.httpService.updateData(mergedCustomer, i);
    this.resetEditStatus();
  }

  deleteCustomer(): void {}

  setValue(key: string, original: string, value: string): void {
    const valueTrim = value.trim();

    if (original !== valueTrim && valueTrim !== this.tempCustomer[key as keyof CustomerInterface]) {
      this.tempCustomer[key as keyof CustomerInterface] = valueTrim;
      this.isNotChanged = false;
    }
  }

  private resetCustomer = (): CustomerInterface => ({key: null, name: '', email: '', mobile: '', location: ''});


  private resetEditStatus(): void {
    this.isEditPos = null;
    this.isNotChanged = true;
    this.tempCustomer = this.resetCustomer();
  }

  private mergeCustomerProps<T>(original: T, temp: T): T {
    const res: T = {...original};

    Object.keys(temp as keyof T).forEach(key => {
      if (temp[key as keyof T]) res[key as keyof T] = temp[key as keyof T];
    });
    return res;
  }
}
