/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: PreloadingStrategy, welche anhand des "preload" Flags entscheidet,
 *             ob ein Modul automatisch geladen wird oder erst bei Zugriff (lazy loading)
 *
 * @author u225284 (Matthias Spicher)
 * @version: 2.0.0
 * @since 14.08.2017
 */

import {PreloadingStrategy, Route} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

    preload(route: Route, load: () => Observable<any>): Observable<any> {

        return route.data && route.data['preload'] ? load() :Observable.of(null);
    }
}
