import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change counter, isClick and secondClick', () => {
    component.counter = 1;
    spyOn(component, 'down').and.callThrough();
    component.down();
    expect(component.down).toHaveBeenCalled();
    expect(component.counter).toBe(2);
    expect(component.isClick).toBe(true);
    expect(component.secondClick).toBe(false);
    component.counter=2;
    component.down();
    expect(component.down).toHaveBeenCalled();
    expect(component.counter).toBe(1);
    expect(component.isClick).toBe(false);
    expect(component.secondClick).toBe(true);
  });
});
