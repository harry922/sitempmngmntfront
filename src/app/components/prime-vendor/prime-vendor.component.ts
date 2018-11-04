import { Router, ActivatedRoute } from '@angular/router';
import { PrimeVendorService } from './../../services/prime-vendor.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './../../pipes/search.pipe';
import { error } from 'selenium-webdriver';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-prime-vendor',
  templateUrl: './prime-vendor.component.html',
  styleUrls: ['./prime-vendor.component.css']
})
export class PrimeVendorComponent implements OnInit {

  primeVendors: Array <any> = [];
  errorMessage: any;
  currentId = 0;
  interviews;

  constructor(private _primeVendorService: PrimeVendorService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) { }

  getPrimeVendors(){
    this._primeVendorService.getPrimeVendors().subscribe(
      data => this.primeVendors = data,
      error => this.errorMessage = error
    )
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


  add(){
    this._router.navigate(['interview/add']);  // update route
  }

  edit(id){
    this._router.navigate(['interview/edit/'+ id])  // update route
  }

  delete(id){
    var ans = confirm("Do you want to delete customer with Id: " + id);
    if(ans){
      this._primeVendorService.deletePrimeVendor(id)
          .subscribe(  data=> {
            var index = this.primeVendors.findIndex(x => x.id == id);
            this.primeVendors.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }

  ngOnInit() {

    this.getProfile();

    /*
    this.getPrimeVendors()
    if(this._activatedRoute.snapshot.params['id']){
    this.currentId = parseInt(this._activatedRoute.snapshot.params['id']);
    }
    */
  }

}
