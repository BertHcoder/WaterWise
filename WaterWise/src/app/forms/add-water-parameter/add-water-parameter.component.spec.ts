import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterParameterComponent } from './add-water-parameter.component';

describe('AddWaterParameterComponent', () => {
  let component: AddWaterParameterComponent;
  let fixture: ComponentFixture<AddWaterParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWaterParameterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWaterParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
