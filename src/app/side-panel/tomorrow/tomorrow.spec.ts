import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tomorrow } from './tomorrow';

describe('Tomorrow', () => {
  let component: Tomorrow;
  let fixture: ComponentFixture<Tomorrow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tomorrow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tomorrow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
