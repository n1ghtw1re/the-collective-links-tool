export interface Link {
  url: string;
  title: string;
  description: string;
}

export function validateLink(link: Link): boolean {
  try {
    new URL(link.url);
    return (
      typeof link.title === 'string' &&
      link.title.length > 0 &&
      typeof link.description === 'string' &&
      link.description.length > 0
    );
  } catch {
    return false;
  }
}

export function validateCategory(links: Link[]): boolean {
  return links.every(validateLink);
}