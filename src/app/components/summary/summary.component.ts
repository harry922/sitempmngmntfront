
import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SummaryService } from 'app/services/summary.service';
import { Observable } from 'rxjs/Observable';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})


export class SummaryComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  interviews;

  constructor(private uploadService: SummaryService, private httpClient: HttpClient) {   }

  ngOnInit() {
    this.getProfile();

  }

fileUpload(): void {
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
    let fileToUpload = fi.files[0];
      this.uploadService
          .upload(fileToUpload)
          .subscribe(res => {
              console.log(res);
          });
  }
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

}
