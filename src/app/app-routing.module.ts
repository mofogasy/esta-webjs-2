/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 *
 * Routendefinition
 *
 * @author u220374 (Reto Lehmann)
 * @version: 2.0.0
 * @since 14.07.2016, 2016.
 */
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './core/home/home.component';

const appRoutes: Routes = [
    // Routes für ExampleModule werden vollständig im Modul definiert

    // Der Einstiegspunkt für das LazyExampleModule muss hier definiert werden
    {path: 'lazy', loadChildren: 'app/lazy-example/lazy-example.module#LazyExampleModule'},

    // Default route
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true,
                enableTracing: true // for debugging
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
