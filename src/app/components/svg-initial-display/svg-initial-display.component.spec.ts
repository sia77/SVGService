import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgInitialDisplayComponent } from './svg-initial-display.component';

describe('SvgInitialDisplayComponent', () => {
  let component: SvgInitialDisplayComponent;
  let fixture: ComponentFixture<SvgInitialDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgInitialDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SvgInitialDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
