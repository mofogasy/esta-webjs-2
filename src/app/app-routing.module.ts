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
import {CustomPreloadingStrategy} from "./custom-preloading-strategy";

const appRoutes: Routes = [
    // Routes für das app Modul
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},

    // Routes für ExampleModule werden vollständig im Modul (example-routing.module.ts) definiert

    // Der Einstiegspunkt für das LazyExampleModule, welches erst beim Zugriff geladen wird
    {path: 'lazy', loadChildren: 'app/lazy-example/lazy-example.module#LazyExampleModule'},

    // Dieses Modul wird automatisch geladen, jedoch erst nach dem Laden der (Haupt-)Anwendung
    {
        path: 'preload',
        loadChildren: 'app/preload-example/preload-example.module#PreloadExampleModule',
        data: {preload: true}
    },

    // Default route
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                useHash: true,
                preloadingStrategy: CustomPreloadingStrategy,
                enableTracing: true     // for debugging
            }
        )
    ],
    exports: [
        RouterModule
    ],
    providers: [
        CustomPreloadingStrategy
    ]
})
export class AppRoutingModule {}
