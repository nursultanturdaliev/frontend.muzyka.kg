import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsongsComponent } from './newsongs.component';

describe('NewsongsComponent', () => {
  let component: NewsongsComponent;
  let fixture: ComponentFixture<NewsongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
