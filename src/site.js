/**
 * The handful of facts that are the same on every page and were, until now,
 * written out separately in the hero, the contact page and the footer. Three
 * copies of an email address is two chances to update the wrong one.
 */

export const SITE_URL = 'https://portfolio-phi-ten-37.vercel.app';

export const CONTACT_EMAIL = 'adalc3488@gmail.com';

export const LINKEDIN = 'https://www.linkedin.com/in/adalbertocerrillo/';
export const GITHUB = 'https://github.com/AdalbertoCV';
export const YOUTUBE = 'https://www.youtube.com/@acerrillosoftware';

// Served from public/. The download attribute renames it on the way out, so it
// lands in a recruiter's folder as a name rather than as the fortieth CV.pdf.
export const CV_PATH = `${process.env.PUBLIC_URL}/CV.pdf`;
export const CV_FILENAME = 'Adal-Cerrillo-Software-Engineer.pdf';
