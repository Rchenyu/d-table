import { Component,Input, Output, EventEmitter,OnChanges, SimpleChange } from '@angular/core'

@Component({
    selector: 'pagination',
    template: `
        <div class="pagination clearfix">
            <ul onselectstart="return false;">
                <li [class.disabled]="currentIndex === 1"
                  (click)="setCurrentPage(1)">
                  <span>第一页</span>
                </li>
                <li [class.disabled]="currentIndex === 1 || !recordsTotal"
                  (click)="setCurrentPage(currentIndex - 1)">
                    <span>‹</span>
                </li>
                <!--<li *ngIf="currentIndex - 2 > 1"-->
                  <!--(click)="setCurrentPage(1)">-->
                  <!--<span>1</span>-->
                <!--</li>-->
                <!--<li *ngIf="currentIndex - 2 > 1" class="disabled">...</li>-->
                <li *ngFor="let index of pageRange"
                    [class.active]="currentIndex === index"
                    (click)="setCurrentPage(index)">
                    <span>{{ index }}</span>
                </li>
                <!--<li *ngIf="currentIndex + 2 < pagesTotal" class="disabled">...</li>-->
                <!--<li *ngIf="currentIndex + 2 < pagesTotal"-->
                  <!--(click)="setCurrentPage(pagesTotal)">-->
                  <!--<span>{{pagesTotal}}</span>-->
                <!--</li>-->
                <li [class.disabled]="currentIndex === pagesTotal || !recordsTotal"
                  (click)="setCurrentPage(currentIndex + 1)">
                  <span>›</span>
                </li>
                <li [class.disabled]="currentIndex === pagesTotal"
                  (click)="setCurrentPage(pagesTotal)">
                  <span>最后一页</span>
                </li>
            </ul>
        </div>
    `,
    styleUrls: ['./Pagination.scss']
})

export class Pagination implements OnChanges {
    @Input() public currentIndex = 0;
    @Input() public recordsTotal = 0;

    @Input() private pageSize: number = 10;

    public pagesTotal = 0;
    public pageRange = [];

    @Output() currentIndexChange = new EventEmitter();

    constructor(){ }
    //根据当前页数与总页数，计算应该显示的页码范围
    range(): void {
        this.pagesTotal = Math.ceil(this.recordsTotal / this.pageSize);
        let result = [];
        let min = this.currentIndex <= 2
            ? 1
            : this.currentIndex >= this.pagesTotal - 2
            ? this.pagesTotal - 4
            : this.currentIndex - 2;
        min = min < 1 ? 1 : min;
        let max = (min + 4) > this.pagesTotal ? this.pagesTotal : (min + 4);

        for (let i = min; i <= max; i++) {
            result.push(i);
        }
        this.pageRange =  result;
    }

    setCurrentPage( $event ){
        if( $event < 1 || $event > this.pagesTotal || $event == this.currentIndex)
            return;
        this.currentIndexChange.emit( $event );
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }){
        if ( changes['currentIndex'] ) {
            this.currentIndex = changes['currentIndex'].currentValue
        }
        if( changes['recordsTotal'] ) {
            this.recordsTotal = changes['recordsTotal'].currentValue
        }
        if( changes['pageSize'] ) {
            this.pageSize = changes['pageSize'].currentValue
        }

        this.range();
    }
}
