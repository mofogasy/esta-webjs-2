/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-Tests AboutComponent
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 26.04.2017, 2017.
 */
import {Pipe, PipeTransform} from '@angular/core';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {TranslateService} from '@ngx-translate/core';
import {ButtonModule, GrowlModule, Message} from 'primeng/primeng';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

import {AboutComponent} from './about.component';
import {PostsService} from './posts.service';

@Pipe({name: 'translate'})
class MockPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return undefined;
    }
}

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;

    class TranslateServiceMock {
        public use() {
        }
    }

    class MockPostsService {
        public getAllPosts() {
            return Observable.of([
                {
                    id: 26,
                    title: 'hi 1',
                },
                {
                    id: 27,
                    title: 'hi 2',
                }
            ]);
        }

        public getPostById(id) {
            return Observable.of(
                {
                    id: id,
                    title: 'hi 4',
                });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GrowlModule, ButtonModule],
            declarations: [AboutComponent, MockPipe],
            providers: [
                {provide: TranslateService, useClass: TranslateServiceMock}
            ]
        })
            .overrideComponent(AboutComponent, {
                set: {
                    providers: [
                        {provide: PostsService, useClass: MockPostsService}
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed
            .createComponent(AboutComponent);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('has a name property [aboutMessage]', () => {
        expect(component.aboutMessage).toBe('Über dieses Template');
    });

    it('onInit should subscribe to PostsService [getAllPosts]', () => {
        component.ngOnInit();
        expect(component.posts.length).toBe(2);
        expect(component.posts[0].title).toBe('hi 1');
        expect(component.posts[1].title).toBe('hi 2');
    });

    it('should push three messages to the message opject', () => {
        // given
        const createMessage = (severity, summary, detail) => ({severity, summary, detail});
        const expectedSuccessMessage: Message = createMessage('info', 'Info Message', 'PrimeNG rocks');
        const expectedWaringMessage: Message = createMessage('warn', 'Warn Message', 'Sample warning');
        const expectedErrorMessage: Message = createMessage('error', 'Error Message', 'Sample error');

        // when
        component.createMessages();
        // then
        expect(component.messages).toContain(expectedSuccessMessage);
        expect(component.messages).toContain(expectedWaringMessage);
        expect(component.messages).toContain(expectedErrorMessage);
    });

    it('onInit should subscribe to PostsService [getPostById]', () => {
        component.ngOnInit();
        expect(component.postById.title).toBe('hi 4');
    });

    it('should call the translationService to change the language',
        inject([TranslateService], (translateService: TranslateService) => {
            const lang = 'de';
            spyOn(translateService, 'use');
            component.changeLanguage(lang);
            expect(translateService.use).toHaveBeenCalled();
        })
    );
});
