import { Component, Input, ContentChildren, QueryList } from '@angular/core'
import { DTableColumnDirective } from './directives/d-table-column.directive'

@Component({
    selector: 'd-table',
    templateUrl: './d-table.component.html',
    styles: ['']
})

export class DTableComponent {

    @Input() source
    @Input() column

    @ContentChildren(DTableColumnDirective) columns: QueryList<DTableColumnDirective>

    ngOnInit() { }

    ngAfterContentInit() {
      this.columns.forEach(column => console.log(column.headerTemplate))
    }

}