import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonviewComponent } from './commonview.component';

describe('CommonviewComponent', () => {
  let component: CommonviewComponent;
  let fixture: ComponentFixture<CommonviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
