import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;
  interviews;

  serarchText: string = '';
  
  constructor( private _customerService: CustomerService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute,
               private user: UserService,
               private httpClient: HttpClient) { }

  ngOnInit() {
    this.getProfile();
    /*
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getCustomers();
    */
  }

  getProfile(){
    this.httpClient.get(`http://192.168.0.37:8181/summary/getcompletesummaryforexcel`)
    .subscribe(
      (data) => {
          console.log(data);
          this.interviews = data;
      }
    )
  }

  getCustomers(){
    this._customerService.getCustomers().subscribe(
        data => this.customers = data,
        error => { debugger;
          this.errorMessage = error
        }
    )
    console.log(this.customers);
  }
  add(){
    this._router.navigate(['customers/add']);
  }
  edit(id){
    this._router.navigate(['customers/edit/' + id]);
  }
  delete(id){
    var ans = confirm("Do you want to delete customer with Id: " + id);
    if(ans){
      this._customerService.deleteCustomer(id)
          .subscribe(  data=> {
            var index = this.customers.findIndex(x => x.id == id);
            this.customers.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }
}
