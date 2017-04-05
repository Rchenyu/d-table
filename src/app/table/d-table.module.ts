import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DTableComponent } from './d-table.component'
import { DTableDirectives } from './directives'

@NgModule({
  imports: [CommonModule],
  declarations: [
    DTableComponent,
    ...DTableDirectives
  ],
  exports: [
    DTableComponent,
    ...DTableDirectives
  ]
})
export class DTableModule { }