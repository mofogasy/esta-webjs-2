/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Routing für lazy-example Modul
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {AboutLazyComponent} from "./about-lazy/about-lazy.component";
import {LazyExampleComponent} from "./lazy-example.component";

const appRoutes: Routes = [
    {
        path: '',
        component: LazyExampleComponent,
        children: [
            {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
            },
            {
                path: 'about',
                component: AboutLazyComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class LazyExampleRoutingModule {}