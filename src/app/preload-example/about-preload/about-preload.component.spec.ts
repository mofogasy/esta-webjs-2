import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPreloadComponent } from './about-preload.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('AboutPreloadComponent', () => {
  let component: AboutPreloadComponent;
  let fixture: ComponentFixture<AboutPreloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPreloadComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
