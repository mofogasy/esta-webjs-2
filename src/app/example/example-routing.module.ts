/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Routing for example module
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017.
 */

import {Routes, RouterModule} from "@angular/router";
import {AboutComponent} from "./about/about.component";
import {ThemeComponent} from "./theme/theme.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
    {path: 'about', component: AboutComponent},
    {path: 'theme', component: ThemeComponent}
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
export class ExampleRoutingModule {}