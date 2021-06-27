import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BasicTablesComponent } from './basic-tables/basic-tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const routes = [
  { path: '', redirectTo: 'basic-tables', pathMatch: 'full'},
  { path: 'basic-tables', component: BasicTablesComponent, data: { breadcrumb: 'Basic Tables' } },
  { path: 'dynamic-tables', loadChildren: 'app/pages/tables/dynamic-tables/dynamic-tables.module#DynamicTablesModule', data: { breadcrumb: 'Dynamic Tables' } }
];

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    BasicTablesComponent
  ]
})
export class TablesModule { }
