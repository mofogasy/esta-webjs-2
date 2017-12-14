/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: App Module
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 10.05.2017, 2017.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {CoreModule} from './core/core.module';
import {ExampleModule} from './example/example.module';
import {AuthModule} from 'esta-webjs-extensions';
import {environment} from '../environments/environment';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AuthModule.forRoot(environment.authConfig),
        CoreModule,
        ExampleModule,
        routing
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
