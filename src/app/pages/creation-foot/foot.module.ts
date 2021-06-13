import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { CKEditorModule } from 'ng2-ckeditor';
import { FootComponent } from './foot.component';

export const routes = [
  { path: '', component: FootComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    DirectivesModule,
    NgbModule,
    CustomFormsModule,
    CKEditorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    FootComponent
  ]
})
export class FootModule { }
