import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service'
import { MockBackendData } from './mockData'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private service: AppService){}
  
  data: Array<any>
  total: number

  ngOnInit(){
    this.service.getData().subscribe((d: MockBackendData) => {
      this.data = d.data
      this.total = d.recordsTotal
    })
  }
}
