/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Routing für preload-example Modul
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017
 */

import {Routes, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {PreloadExampleComponent} from "./preload-example.component";
import {AboutPreloadComponent} from "./about-preload/about-preload.component";

const appRoutes: Routes = [
    {
        path: '',
        component: PreloadExampleComponent,
        children: [
            {
                path: '',
                redirectTo: 'about',
                pathMatch: 'full'
            },
            {
                path: 'about',
                component: AboutPreloadComponent
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
export class PreloadExampleRoutingModule {}
