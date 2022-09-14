import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ActiveToDoComponent} from './active-to-do.component';

describe('ActiveToDoComponent', () => {
  let component: ActiveToDoComponent;
  let fixture: ComponentFixture<ActiveToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveToDoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
