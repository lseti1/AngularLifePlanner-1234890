import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionView } from './selection-view';

describe('SelectionView', () => {
  let component: SelectionView;
  let fixture: ComponentFixture<SelectionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
