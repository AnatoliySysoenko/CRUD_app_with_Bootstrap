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

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.customer$ = this.httpService.getData();
  }
}
