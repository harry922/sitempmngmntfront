import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PrimeVendorService {

  baseUrl: string = 'http://localhost:8080/';
  
      constructor(private _http: Http) { }
  
      getPrimeVendors(){
        return this._http.get(this.baseUrl + 'primevendors')
                  .map((response: Response) => response.json())
                  .catch(this._errorHandler);
      }
  
      getPrimeVendorById(id){
        return this._http.get(this.baseUrl + 'primevendors/getprimevendorsbyid/'+ id)
                .map((response: Response) => response.json())
                .catch(this._errorHandler)
      }
  
      savePrimeVendor(interview){
        console.log(interview);
        return this._http.post(this.baseUrl + 'primevendors/addprimevendors', interview)
                .map((response: Response) => response)
               .catch(this._errorHandler)
      }
  
      deletePrimeVendor(id){
        return this._http.delete(this.baseUrl + 'primevendors/deleteprimevendors/' + id)
                  .map((response:Response) =>  response)
                  .catch(this._errorHandler)
      }
  
      _errorHandler(error:Response){
        console.log(error);
        return Observable.throw(error || "Internal server error");
      }

}
