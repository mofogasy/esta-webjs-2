/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: E2E Test für die Aboutseite
 *
 * @author u226856 (Pascal Obrist)
 * @version: 2.0.0
 * @since 25.10.2017, 2018.
 */

const assert = require('assert');
const puppeteer = require('puppeteer');

let browser;
let page;

describe('AboutPage', async () => {

  beforeEach(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it('should change the langugae from german to english and back to german', async () => {
      await page.goto('http://localhost:4200/#/about');

      //English page
      await page.click('#change-to-english-button');
      let title = await page.$('#about-title');
      let title_text = await title.getProperty('textContent');
      let subtitle = await page.$('#about-subtitle');
      let subtitle_text = await subtitle.getProperty('textContent');

      assert(await title_text.jsonValue(), 'The about page');
      assert(await subtitle_text.jsonValue(), 'This text gets translated by ng2-translate');

      //German page
      await page.click('#change-to-german-button');
      title = await page.$('#about-title');
      title_text = await title.getProperty('textContent');
      subtitle = await page.$('#about-subtitle');
      subtitle_text = await subtitle.getProperty('textContent');

      assert(await title_text.jsonValue(), 'Die About Seite');
      assert(await subtitle_text.jsonValue(), 'Dieser Text wird von ng2-translate übersetzt');

    });

  afterEach(async () => {
    await page.close();
    await browser.close();
  });

});



