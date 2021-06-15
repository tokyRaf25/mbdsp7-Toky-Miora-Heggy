import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichefootComponent } from './fichefoot.component';

describe('FichefootComponent', () => {
  let component: FichefootComponent;
  let fixture: ComponentFixture<FichefootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichefootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichefootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
