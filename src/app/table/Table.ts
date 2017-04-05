import { Observable, Subscription } from "rxjs"

export class Table {
  //数据是否已经初始化
  private init: boolean = false
  //是否在服务端分页
  private serverSide: boolean = true
  //总的数据量
  public recordsTotal: number = 0
  //筛选条件
  private filter
  //参与筛选的属性
  filterProps: Array<string> = []
  //总的页数
  private pagesTotal: number = 0
  //要显示的页数范围
  private pageRange: number[] = []

  //当前页码
  private _currentIndex: number = 1
  //设置一个 setter ，每当 currentIndex 改变时，触发 update 函数
  set currentIndex(value) {
    this._currentIndex = value
    this.init && this.update()
  }
  get currentIndex(): number {
    return this._currentIndex
  }

  //每页数据量
  private _pageSize: number = 10
  set pageSize(value) {
    this._pageSize = value
    this.init && this.update()
  }
  get pageSize() {
    return this._pageSize
  }

  //排序顺序
  private asc
  private ascIndex

  private _data: Object[] = []
  get data() {
    let res
    if (this.serverSide) {
      res = this._data
    } else {
      //手动分页
      res = this._data.slice((this.currentIndex - 1) * this.pageSize, this.currentIndex * this.pageSize)
    }
    //过滤
    return this.filterProps.length ? res.filter((item) => {
      if (!this.filter) {
        return true
      }
      var result = false
      this.filterProps.forEach((key) => {
        if (item[key] && item[key].toString().toLowerCase().indexOf(this.filter.toLowerCase()) > -1) {
          result = true
        }
      })
      return result
    }) : res
  }

  set data(value) {
    this._data = value
  }

  constructor(options?: any) {
    this.serverSide = options.serverSide != undefined ? options.serverSide : true
    this.filterProps = options.filterProps || []
    this.getData = options.getData
    this.pageSize = options.pageSize || 10
    this.currentIndex = options.currentIndex || 1
    this.getDataCallback = options.getDataCallback
    this.update()
  }

  getDataCallback: Function
  //页码切换到某页
  setCurrentPage(pageNumber, $event) {
    $event && $event.preventDefault()
    this.currentIndex = pageNumber
  }

  getData: (obj?: any) => Observable<any>
  
  // subscribe 之后返回的对象，可以 unsubscribe 以取消 http 请求
  private subscrition: Subscription = null

  //获取数据，并根据数据设置各项参数
  update (reset: boolean = false) {
    let prePage = this.init ? Math.ceil(this.recordsTotal / this.pageSize) : -1
    if (reset || (!this.init || this.serverSide)) {
      this.data = []
      let pro = this.getData({ currentIndex: this.currentIndex, pageSize: this.pageSize })
      if (!pro) {
        return 
      }
      this.subscrition && this.subscrition.unsubscribe()
      this.subscrition = pro.subscribe(res => {
        if (!res) {
          return
        }
        this.data = res.data
        this.recordsTotal = res.recordsTotal || res.data.length
        this.pagesTotal = Math.ceil(this.recordsTotal / this.pageSize)
        this.pagesTotal < this.currentIndex && (this._currentIndex = this.pagesTotal)
        if (this.pagesTotal - prePage == 1) {
          this._currentIndex = this.pagesTotal
        }
        this.getDataCallback && this.getDataCallback()
        this.init = true
      })
    }
  }

  sortBy (index) {
    var key = this.filterProps[index]
    this.ascIndex = index
    this.asc = !this.asc
    var self = this
    this.data = this.data.sort(function (a, b) {
      let sort = +(a[key] > b[key])
      return +(self.asc ? sort : !sort)
    })
  }

  changeIndex (index) {
    this.currentIndex = index
  }
}
