import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoListComparisonComponent } from './photo-list-comparison.component';

describe('PhotoListComparisonComponent', () => {
  let component: PhotoListComparisonComponent;
  let fixture: ComponentFixture<PhotoListComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoListComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
