import { Directive, TemplateRef, ContentChild, Input } from '@angular/core'
import { DTableHeaderDirective } from './d-table-header.directive'
import { DTableCellDirective } from './d-table-cell.directive'
@Directive({ selector: 'd-table-column' })
export class DTableColumnDirective {

  @Input() header: string
  @Input() prop: string

  @Input() map: any

  @Input() width: number
  @Input() maxWidth: number

  @ContentChild(DTableHeaderDirective, { read: TemplateRef }) 
  headerTemplate: TemplateRef<any>

  @ContentChild(DTableCellDirective, { read: TemplateRef }) 
  cellTemplate: TemplateRef<any>

}