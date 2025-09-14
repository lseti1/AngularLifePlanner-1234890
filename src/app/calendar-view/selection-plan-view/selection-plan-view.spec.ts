import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPlanView } from './selection-plan-view';

describe('SelectionPlanView', () => {
  let component: SelectionPlanView;
  let fixture: ComponentFixture<SelectionPlanView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionPlanView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionPlanView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
