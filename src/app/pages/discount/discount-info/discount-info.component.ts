import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public discount!: IDiscountResponse;
  public separatedText!: Array<string>;

  constructor(
    private activatedRout: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRout.data.subscribe(response => {
      this.discount = response['discountInfo'];
      this.separatedText = this.discount.text.split('.');
      this.separatedText.pop();
    })
    this.isEmpty()
  }
  isEmpty(): void{
    if (!this.discount) {
      this.discount={
        name: 'name',
        title: 'title',
        text: 'text',
        imagePath: 'image',
        id: '1'
      }
    }
  }
}
