import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [AboutComponent, QuestionComponent],
  imports: [CommonModule, SharedModule, AboutRoutingModule],
})
export class AboutModule {}
