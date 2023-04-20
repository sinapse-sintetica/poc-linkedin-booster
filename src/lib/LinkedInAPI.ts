import axios from 'axios';

export class ExtractedProfile {
  public name: string = '';
  public headline: string = '';
  public about: string = '';
  public location: string = '';
}

export class LinkedInAPI {

  constructor(private profileUrl: string) {}

  async init(): Promise<void> {
    // const clientSecret: string = process.env.LINKEDIN_CLIENT_SECRET || '';
    // const clientId: string = process.env.LINKEDIN_CLIENT_ID || '';
  }

  async getProfileInfo(): Promise<ExtractedProfile> {

    try {
      const access_token = process.env.LINKEDIN_ACCESS_TOKEN;
      const headers = { Authorization: `Bearer ${access_token}` };

      // Obter headline e about
      const response = await axios
          // .get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,headline,summary,headlineV2(multiLocale),summaryV2(multiLocale))', { headers });
          .get('https://api.linkedin.com/v2/me', { headers });

      const language = 'pt_BR'; // Escolha o código do idioma que você deseja (por exemplo, 'pt_BR' para português do Brasil)
      const profile_data = response.data;
      const firstName: string = profile_data.localizedFirstName || '';
      const lastName: string = profile_data.localizedLastName || '';
      const headlineMultiLocale = profile_data.headlineV2?.multiLocale || {};
      const aboutMultiLocale = profile_data.summaryV2?.multiLocale || {};

      console.log('profile data', profile_data);
      
      // Exibir headline e about em todos os idiomas disponíveis
      const languages = new Set([
        ...Object.keys(headlineMultiLocale),
        ...Object.keys(aboutMultiLocale),
      ]);

      let headline: string = '';
      let about: string = '';

      languages.forEach((language) => {
        headline = `${headlineMultiLocale[language] || ''}`;
        about = `${aboutMultiLocale[language] || ''}`;
        console.log(`Language: ${language}`);
        console.log(`Headline: ${headlineMultiLocale[language] || ''}`);
        console.log(`About: ${aboutMultiLocale[language] || ''}`);
        console.log('');
      });

      console.log(`First Name: ${firstName}`);
      console.log(`Last Name: ${lastName}`);
      console.log(`Headline: ${headline}`);
      console.log(`About: ${about}`);

      const extractedProfile = new ExtractedProfile();
      extractedProfile.name = `${firstName} ${lastName}`;
      extractedProfile.headline = headline;
      // extractedProfile.location = location;
      extractedProfile.about = about;
      return extractedProfile;
    } catch (error) {
      console.error(`Error fetching profile data: ${error}`);
      throw error;
    }
  }
}
