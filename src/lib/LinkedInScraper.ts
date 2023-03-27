import puppeteer, { Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class LinkedInScraper {
  private page: Page | undefined;

  constructor(private profileUrl: string) {}

  async init(): Promise<void> {
    const browser = await puppeteer.launch({ headless: true });
    this.page = await browser.newPage();
    await this.page.goto(this.profileUrl, { waitUntil: 'networkidle2' });
  }

  async isProfilePage(): Promise<boolean> {
    if (!this.page) {
      throw new Error('Page not initialized. Call init() first.');
    }
  
    try {
      const titleElement = await this.page.waitForSelector('.top-card-layout__title', { timeout: 3000 });
      return !!titleElement;
    } catch (error) {
      console.error('Not a LinkedIn profile page:', error);
      return false;
    }
  } 

  async getProfileInfo(): Promise<object> {
    if (!this.page) {
      throw new Error('Page not initialized. Call init() first.');
    }

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const name = $('.top-card-layout__title').text().trim();
    const headline = $('.top-card-layout__headline').text().trim();
    const location = $('.top-card-layout__first-subline > .top-card__subline-item:first-child').text().trim();
    const about = $('.core-section-container__content > p:first-child').html()?.replace(/<br>/g, '\n').trim() || '';

    return {
      name,
      headline,
      location,
      about,
    };
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.browser().close();
    }
  }
}
