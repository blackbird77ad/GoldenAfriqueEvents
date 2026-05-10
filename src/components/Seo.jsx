import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://goldenafriqueevents.com';
const DEFAULT_IMAGE = `${SITE_URL}/brand-logo-tight.jpeg`;

const PAGE_META = {
  '/': {
    title:
      'Golden Afrique Events | Party Rentals, African Catering & Event Services in Chicago, Illinois',
    description:
      'Golden Afrique Events provides premium party rentals, authentic African catering, event decor, and equipment hire in Chicago, Illinois for weddings, birthdays, corporate events, and private celebrations.',
    robots: 'index, follow, max-image-preview:large',
  },
  '/catering': {
    title: 'African Catering in Chicago | Golden Afrique Events',
    description:
      'Explore authentic African catering in Chicago from Golden Afrique Events, including party trays, wedding menus, private event catering, and corporate service.',
    robots: 'index, follow, max-image-preview:large',
  },
  '/rentals': {
    title: 'Party Rentals in Chicago | Golden Afrique Events',
    description:
      'Browse Chicago party rentals from Golden Afrique Events, including event decor, seating, table settings, serving equipment, tents, and celebration essentials.',
    robots: 'index, follow, max-image-preview:large',
  },
  '/gallery': {
    title: 'Event Gallery | Golden Afrique Events',
    description:
      'See photos of Golden Afrique Events catering, decor, rentals, and event setups across weddings, birthdays, and celebrations in Chicago, Illinois.',
    robots: 'index, follow, max-image-preview:large',
  },
  '/contact': {
    title: 'Contact Golden Afrique Events | Chicago Event Services',
    description:
      'Contact Golden Afrique Events for party rentals, African catering, decor, and event planning support in Chicago, Illinois.',
    robots: 'index, follow, max-image-preview:large',
  },
  '/admin': {
    title: 'Golden Afrique Events Admin',
    description: 'Admin area for Golden Afrique Events.',
    robots: 'noindex, nofollow, noarchive',
  },
};

const upsertMeta = (attrName, attrValue, content) => {
  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const normalizePathname = (pathname) => {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
};

export default function Seo() {
  const location = useLocation();

  useEffect(() => {
    const pathname = normalizePathname(location.pathname);
    const meta = PAGE_META[pathname] || PAGE_META['/'];
    const canonicalUrl =
      pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`;

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.robots);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:image', DEFAULT_IMAGE);
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', DEFAULT_IMAGE);
    upsertLink('canonical', canonicalUrl);
  }, [location.pathname]);

  return null;
}
