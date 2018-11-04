import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class InterviewService {
      baseUrl: string = 'http://localhost:8080/';

    constructor(private _http: Http) { }

    getInterviews(){
      return this._http.get(this.baseUrl + 'interviews')
                .map((response: Response) => response.json())
                .catch(this._errorHandler);
    }

    getInterviewById(id){
      return this._http.get(this.baseUrl +"interviews/getInterviewById/"+ id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    saveInterview(interview){
      console.log(interview);
      return this._http.post(this.baseUrl + 'interviews/addinterview', interview)
              .map((response: Response) => response)
             .catch(this._errorHandler)
    }

    deleteInterview(id){
      return this._http.delete(this.baseUrl + 'interviews/deleteinterview/' + id)
                .map((response:Response) =>  response)
                .catch(this._errorHandler)
    }

    _errorHandler(error:Response){
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
