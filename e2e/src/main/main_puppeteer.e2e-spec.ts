import * as puppeteer from 'puppeteer';

describe('localhost main page test', () => {
  it('Test Puppeteer screenshot', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:4200');
    await page.screenshot({ path: 'Main.png' });

    await browser.close();
  });
});
