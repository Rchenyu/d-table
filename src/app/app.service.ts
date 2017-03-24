import { Injectable } from '@angular/core'
import { Http, Headers, URLSearchParams } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'

import { mockBackend } from './mockData'
// mockBackend.data => 数组，数据格式参考文档：
// http://27.115.5.125:3333/showdoc/index.php?s=/2&page_id=25

@Injectable()
export class AppService {

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return Observable.create(observer => observer.next(mockBackend))
  }
}

