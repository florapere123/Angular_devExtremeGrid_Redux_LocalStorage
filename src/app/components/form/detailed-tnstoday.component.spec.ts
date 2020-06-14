import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTnstodayComponent } from './detailed-tnstoday.component';

describe('ProductFormComponent', () => {
  let component: DetailedTnstodayComponent;
  let fixture: ComponentFixture<DetailedTnstodayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedTnstodayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTnstodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
