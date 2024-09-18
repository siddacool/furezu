const PREFIX = 'FZU';

export function generateCookieName(name: string) {
  return `${PREFIX}_${name}`;
}
