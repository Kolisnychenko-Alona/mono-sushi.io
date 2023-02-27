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
    private discountService: DiscountService, 
    private activatedRout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOneDiscount();
  }

  getOneDiscount(): void{
    const DISCOUNT_ID = Number(this.activatedRout.snapshot.paramMap.get('id'));
    this.discountService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;
      this.separatedText = data.text.split('.');
      this.separatedText.pop();
      console.log(this.separatedText);
    });

  }
  
  // separate(): void{
  //   const text = this.discount.text;
  //   console.log(text)
  //   // this.separatedText = text.split('. ');
  // }

}
