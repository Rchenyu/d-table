import  { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Pagination } from "./Pagination.component";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ Pagination ],
  exports: [ Pagination ]
})

export class TableModule { }

export * from './Table'
