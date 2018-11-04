import { SearchPipe } from './../../pipes/search.pipe';
import { InterviewService } from './../../services/interview.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'selenium-webdriver';
import { Route } from '@angular/router/src/config';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

 // interviews: Array <any> = []; 
  interviews;
  errorMessage: any;
  currentId = 0;

  constructor(private _interviewService: InterviewService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private httpClient: HttpClient) { }

              
  getInterviews(){
    this._interviewService.getInterviews().subscribe(
      data => this.interviews = data,
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
    this._router.navigate(['interview/add']);
  }

  edit(id){
    this._router.navigate(['interview/edit/'+ id])
  }

  delete(id){
    var ans = confirm("Do you want to delete customer with Id: " + id);
    if(ans){
      this._interviewService.deleteInterview(id)
          .subscribe(  data=> {
            var index = this.interviews.findIndex(x => x.id == id);
            this.interviews.splice(index, 1);
          }, error=> this.errorMessage = error )
    }
  }

  ngOnInit() {
    this.getProfile();

  /*  
    this.getInterviews()
    if(this._activatedRoute.snapshot.params['id']){
    this.currentId = parseInt(this._activatedRoute.snapshot.params['id']);
    }
  */
  }

}
