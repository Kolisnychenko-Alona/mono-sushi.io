import { Component, Input, OnInit } from '@angular/core';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() question!: Array<string>;

    public isClick = false;
    public secondClick = false;
    public counter = 1;

  constructor() { }

  ngOnInit(): void {
  }

  down(): void{
    if (this.counter == 1) {
      this.secondClick = false;
      this.isClick = true;
      this.counter += 1;
    }
    else if (this.counter == 2) {
      this.isClick = false;
      this.secondClick = true;
      this.counter -= 1;
    }
  }

}


