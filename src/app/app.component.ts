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
    
  moduleIdMap = ['', '封包','网络','文件','未知','进程','登陆']

  edit(data) {
    console.log(data)
  }

  ngOnInit(){
    this.service.getData().subscribe((d: MockBackendData) => {
      this.data = d.data
      this.total = d.recordsTotal
    })
  }
}
