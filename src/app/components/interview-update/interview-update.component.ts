import { InterviewService } from './../../services/interview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-interview-update',
  templateUrl: './interview-update.component.html',
  styleUrls: ['./interview-update.component.css']
})
export class InterviewUpdateComponent implements OnInit {

  interviewForm: FormGroup;
  title: string = "Add";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;

  constructor(private _fb: FormBuilder,
              private _avRoute: ActivatedRoute,
              private _interviewService: InterviewService,
              private _router : Router) {
    if(this._avRoute.snapshot.params["id"]){
       this.id = parseInt( this._avRoute.snapshot.params["id"]);
       console.log(this.id);
    }


    this.interviewForm = this._fb.group({
      candidateName: ['', [Validators.required]],
      interviewId:[''],
      primeVendorName: ['', [Validators.required]],
      clientDetails: this._fb.group({
        clientName: ['', [Validators.required]],
        location: this._fb.group({
          streetAddress: ['', [Validators.required]],
          cityName: ['', [Validators.required]],
          stateName: ['', [Validators.required]],
          countryName: ['', [Validators.required]],
          pincode: ['', [Validators.required]]
        })

      })

    })
  }

  ngOnInit() {
    if(this.id > 0){
        this.title = 'Edit';
        this._interviewService.getInterviewById(this.id)
          .subscribe(resp => this.interviewForm.setValue(resp)
                  , error => this.errorMessage = error);
    }
  }


save(){ 
    this.submitted = true;
    if(!this.interviewForm.valid){
        return;
    }

    this._interviewService.saveInterview(this.interviewForm.value)
    .subscribe(custId => {
        alert('Saved Successfully!')
        this._router.navigate(['interview', {id: custId}]);
     }, error => this.errorMessage = error )
}

cancel(){
  this._router.navigate(['interview', {id: this.id}]);
}

  get candidateName() { return this.interviewForm.get('candidateName'); }
  get primeVendorName() { return this.interviewForm.get('primeVendorName'); }
  get clientName() { return this.interviewForm.get('clientDetails.clientName'); }
  get stateName() { return this.interviewForm.get('clientDetails.location.stateName'); }
  get countryName() { return this.interviewForm.get('clientDetails.location.countryName'); }
  get cityName() { return this.interviewForm.get('clientDetails.location.cityName'); }
  get streetAddress() { return this.interviewForm.get('clientDetails.location.streetAddress'); }
  get pincode() { return this.interviewForm.get('clientDetails.location.pincode'); }
}
