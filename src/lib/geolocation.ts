/**
 * Geolocation utility to detect user's country
 * Uses IP-based geolocation from free API
 */

export interface GeolocationData {
  country_code: string;
  country_name: string;
  city?: string;
  region?: string;
}

/**
 * Get user's country from their IP address
 * Uses a free IP geolocation API
 */
export async function getUserCountry(): Promise<string | null> {
  try {
    // Try using the IP geolocation API (free tier)
    const response = await fetch('https://ipapi.co/json/');
    
    if (!response.ok) {
      console.warn('Geolocation API failed');
      return null;
    }

    const data = await response.json();
    
    // Return the country code (e.g., 'IN', 'US', 'FR')
    return data.country_code || null;
  } catch (error) {
    console.warn('Failed to fetch geolocation data:', error);
    return null;
  }
}

/**
 * Alternative geolocation method using browser's Geolocation API
 * Note: Requires user permission
 */
export function getUserCountryFromBrowser(): Promise<string | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding to get country from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          
          if (!response.ok) {
            resolve(null);
            return;
          }

          const data = await response.json();
          const address = data.address;
          
          // Try to extract country code from address
          const countryCode = address?.country_code?.toUpperCase() || null;
          resolve(countryCode);
        } catch (error) {
          console.warn('Reverse geocoding failed:', error);
          resolve(null);
        }
      },
      (error) => {
        console.warn('Browser geolocation error:', error);
        resolve(null);
      },
      {
        timeout: 5000,
        maximumAge: 3600000, // Cache for 1 hour
      }
    );
  });
}

/**
 * Get user's country with fallback strategies
 * 1. First tries IP-based geolocation (no permission needed)
 * 2. Falls back to browser geolocation if IP fails (requires permission)
 */
export async function detectUserCountry(): Promise<string | null> {
  // First try IP-based geolocation (no permission required)
  const ipCountry = await getUserCountry();
  if (ipCountry) {
    return ipCountry;
  }

  // Fallback to browser geolocation (requires permission)
  const browserCountry = await getUserCountryFromBrowser();
  return browserCountry;
}

/**
 * Map language to likely country code
 * Useful for setting a default country based on language selection
 */
export const languageToCountryMap: Record<string, string> = {
  en: 'US', // Default to US for English
  hi: 'IN', // Hindi → India
  es: 'ES', // Spanish → Spain
  fr: 'FR', // French → France
  ar: 'SA', // Arabic → Saudi Arabia
  de: 'DE', // German → Germany
  pt: 'BR', // Portuguese → Brazil
  zh: 'CN', // Chinese → China
  ja: 'JP', // Japanese → Japan
  ru: 'RU', // Russian → Russia
  it: 'IT', // Italian → Italy
  ko: 'KR', // Korean → South Korea
};

/**
 * Get suggested country based on selected language
 */
export function getCountryFromLanguage(languageCode: string): string | null {
  return languageToCountryMap[languageCode] || null;
}
