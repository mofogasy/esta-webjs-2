/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Beispielmodul zur Demonstration von lazy loading
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {LazyExampleRoutingModule} from "./lazy-example-routing.module";
import { AboutLazyComponent } from './about-lazy/about-lazy.component';
import {LazyExampleComponent} from "./lazy-example.component";

@NgModule({
    imports: [
        LazyExampleRoutingModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LazyExampleComponent,
        AboutLazyComponent
    ]
})
export class LazyExampleModule {}
