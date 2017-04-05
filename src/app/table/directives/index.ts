export * from './d-table-column.directive'
export * from './d-table-header.directive'
export * from './d-table-cell.directive'

import { DTableColumnDirective } from './d-table-column.directive'
import { DTableHeaderDirective } from './d-table-header.directive'
import { DTableCellDirective } from './d-table-cell.directive'

export const DTableDirectives = [
  DTableColumnDirective,
  DTableHeaderDirective,
  DTableCellDirective
]