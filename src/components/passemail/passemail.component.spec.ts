import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassemailComponent } from './passemail.component';

describe('PassemailComponent', () => {
  let component: PassemailComponent;
  let fixture: ComponentFixture<PassemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassemailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
