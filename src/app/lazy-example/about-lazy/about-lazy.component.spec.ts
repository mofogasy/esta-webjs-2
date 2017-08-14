/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit Tests für AboutLazyComponent
 *
 * @author u225284 (Matthias Spicher)
 * @version 2.0.0
 * @since 14.08.2017
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutLazyComponent } from './about-lazy.component';

describe('AboutComponent', () => {
  let component: AboutLazyComponent;
  let fixture: ComponentFixture<AboutLazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutLazyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
