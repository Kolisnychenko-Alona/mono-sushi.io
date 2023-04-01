import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/IDiscount';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public discount!: IDiscountResponse;
  public separatedText!: Array<string>;

  constructor(
    private activatedRout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRout.data.subscribe(response => {
      this.discount = response['discountInfo'];
      this.separatedText = response['discountInfo'].text.split('.');
      this.separatedText.pop();
    })
  }
}
