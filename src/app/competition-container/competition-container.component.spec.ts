import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionContainerComponent } from './competition-container.component';

describe('CompetitionContainerComponent', () => {
  let component: CompetitionContainerComponent;
  let fixture: ComponentFixture<CompetitionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
