import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerInterface } from '../../../shared/types/customer.interface';
import { DEFAULT_CUSTOMER } from '../../../shared/data/mock-data';

@Component({
  selector: 'customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  form!: FormGroup;

  constructor(private httpService: HttpService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.httpService.createData();
    this.initializeForm();
  }

  onSubmit(): void {
    this.httpService.createData(this.form.value).subscribe();
    this.clearForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(8)]],
      location: ['', [Validators.required]],
    });

    this.setControlsValue(DEFAULT_CUSTOMER);
  }

  private clearForm(): void {
    this.setControlsValue(null);
  }

  private setControlsValue(customer: CustomerInterface | null): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].setValue(customer?.[key as keyof CustomerInterface] || null);
    });
  }
}
