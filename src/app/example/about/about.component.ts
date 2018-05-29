/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Page Object für die About Seite
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 10.05.2017, 2017.
 */
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Message} from 'primeng/primeng';

import {PostsService} from './posts.service';
import {Observable} from 'rxjs';
import {Post} from './posts.model';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    providers: [PostsService]
})
export class AboutComponent implements OnInit {
    public aboutMessage: string;
    public posts$: Observable<Array<Post>>;
    public postById$: Observable<Post>;
    public messages: Array<Message> = [];

    public readonly SAMPLE_POST_ID = 40;

    constructor(private postsService: PostsService,
                private translateService: TranslateService) {

        this.aboutMessage = 'Über dieses Template';
    }

    ngOnInit(): any {
        this.posts$ = this.postsService.getAllPosts();
        this.postById$ = this.postsService.getPostById(this.SAMPLE_POST_ID);
    }

    createMessages() {
        this.messages.push({severity: 'info', summary: 'Info Message', detail: 'PrimeNG rocks'});
        this.messages.push({severity: 'warn', summary: 'Warn Message', detail: 'Sample warning'});
        this.messages.push({severity: 'error', summary: 'Error Message', detail: 'Sample error'});
    }

    changeLanguage(lang) {
        this.translateService.use(lang);
    }
}
