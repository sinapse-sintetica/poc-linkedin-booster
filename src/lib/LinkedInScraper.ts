import puppeteer, { Page } from 'puppeteer';
import * as cheerio from 'cheerio';

export class ExtractedProfile {
  public name: string = '';
  public headline: string = '';
  public about: string = '';
  public location: string = '';
}

export class LinkedInScraper {
  private page: Page | undefined;

  constructor(private profileUrl: string) {}

  async init(): Promise<void> {
    const proxyHost = process.env.PROXY_HOST;
    const proxyPort = process.env.PROXY_PORT;
    const proxyUsername = process.env.PROXY_USERNAME;
    const proxyPassword = process.env.PROXY_PASSWORD;
    const proxyUrl = `http://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;

    const browser = await puppeteer.launch({ 
      headless: true,
      ignoreHTTPSErrors: true,
      args: [
        `--proxy-server=${proxyUrl}`
        // Se necessário, adicione '--no-sandbox' e '--disable-setuid-sandbox'
      ]
    });
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

  async getProfileInfo(): Promise<ExtractedProfile> {
    if (!this.page) {
      throw new Error('Page not initialized. Call init() first.');
    }

    const content = await this.page.content();
    const $ = cheerio.load(content);

    const name = $('.top-card-layout__title').text().trim();
    const headline = $('.top-card-layout__headline').text().trim();
    const location = $('.top-card-layout__first-subline > .top-card__subline-item:first-child').text().trim();
    const about = $('.core-section-container__content > p:first-child').html()?.replace(/<br>/g, '\n').trim() || '';

    const extractedProfile = new ExtractedProfile();
    extractedProfile.name = name;
    extractedProfile.headline = headline;
    extractedProfile.location = location;
    extractedProfile.about = about;
    return extractedProfile;
  }

  async close(): Promise<void> {
    if (this.page) {
      await this.page.browser().close();
    }
  }
}
