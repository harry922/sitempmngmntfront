import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
export class SummaryService {

  constructor(private http: HttpClient) {  }

  upload(fileToUpload: any) {
    let input = new FormData();
    input.append('file', fileToUpload);

    return this.http
        .post('http://192.168.0.37:8181/summary/addsummaryfromexcel', input);
    }
}
