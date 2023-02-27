import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public questions: IQuestion[] = [
    {
      question: 'Як можна замовити, якщо наша адреса не входить у вашу зону доставки?',
      answer: 'Якщо ваша адреса знаходиться поза межами нашої зони доставки, ви можете: 1. Забрати замовлення самовивозом за однією з наших адрес. (В такому випадку ви отримаєте “Запечені моно макі з лососем у подарунок); 2. Дізнатись в оператора чи є можливість зробити виключення для доставки поза межі зони в даний момент часу.'
  
    },
    {
      question: 'Скільки часу очікувати на замовлення?',
      answer: `Час доставки залежить від адреси замовлення.
               Доставка в зелену зону – до 1 год.
               Доставка в жовту зону – до 1,5 год.`
    },
    {
      question: 'Доставка безкоштовна?',
      answer: 'Так, доставка безкоштовна при мінімальній сумі замовлення 200 грн в зелену зону доставки та 300 грн в жовту зону.'
    },
    {
      question: 'До якої години ви приймаєте замовлення?',
      answer: 'Ми приймаємо замовлення кожного дня з 11:00 по 21:30 ( у зв’язку з комендантською годиною )'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }  

}

interface IQuestion{
  question: string;
  answer: string;
}