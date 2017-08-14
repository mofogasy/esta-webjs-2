/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Beispielmodul zur Demonstration von preloading
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AboutPreloadComponent } from './about-preload/about-preload.component';
import {PreloadExampleRoutingModule} from "./preload-example-routing.module";
import {PreloadExampleComponent} from "./preload-example.component";

@NgModule({
    imports: [
        PreloadExampleRoutingModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PreloadExampleComponent,
        AboutPreloadComponent
    ]
})
export class PreloadExampleModule {}