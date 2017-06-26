import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomsongsComponent } from './randomsongs.component';

describe('RandomsongsComponent', () => {
  let component: RandomsongsComponent;
  let fixture: ComponentFixture<RandomsongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomsongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
