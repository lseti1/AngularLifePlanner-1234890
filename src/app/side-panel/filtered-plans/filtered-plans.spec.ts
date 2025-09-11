import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredPlans } from './filtered-plans';

describe('FilteredPlans', () => {
  let component: FilteredPlans;
  let fixture: ComponentFixture<FilteredPlans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteredPlans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteredPlans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
