import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomerInterface } from '../types/customer.interface';
import { catchError, map, Observable, of } from 'rxjs';
import { ResponseCustomerInterface } from '../types/responseCustomer.interface';
import { RequestCustomerInterface } from '../types/requestCustomer.interface';

const url = 'https://crud-app-temp-default-rtdb.europe-west1.firebasedatabase.app';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) { }

  createData(customer: CustomerInterface): Observable<CustomerInterface[]> {
    return this.http.post<RequestCustomerInterface>(`${url}/customers.json`, customer, httpOptions).pipe(
      map((res) => {
        Object.keys(res).forEach(key => this.customers.push({...{key: res.name}, ...customer}));
        return this.customers;
      })
    );
  }

  getData(): Observable<CustomerInterface[]> {
    return this.http.get<ResponseCustomerInterface>(`${url}/customers.json`, httpOptions).pipe(
      map((res) => {
        Object.keys(res).forEach(key => this.customers.push({key, ...res[key]}));
        return this.customers;
      })
    );
  }

  updateData(customer: CustomerInterface, i: number): void {
    const {key, ...data} = customer;
    this.http.put<CustomerInterface>(`${url}/customers/${key}.json`, data, httpOptions).subscribe({
      next: () => this.customers[i] = customer,
      error: catchError(this.errorHandler<CustomerInterface>('PUT'))
    });
  }

  deleteData(customer: CustomerInterface): void {
    this.http.delete(`${url}/customers/${customer.key}.json`, httpOptions).subscribe({
      next: () => this.customers.splice(this.customers.indexOf(customer), 1),
      error: catchError(this.errorHandler<CustomerInterface>('DELETE'))
    });
  }

  private errorHandler<T>(operation: string, res?: any) {
    return (err: any): Observable<T> => {
      console.log(`${operation} failed: ${res}`);
      return of(res as T);
    };
  }
}
