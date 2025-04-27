import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaterParameterComponent } from './edit-water-parameter.component';

describe('EditWaterParameterComponent', () => {
  let component: EditWaterParameterComponent;
  let fixture: ComponentFixture<EditWaterParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWaterParameterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWaterParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
