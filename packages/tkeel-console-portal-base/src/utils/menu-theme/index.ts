export function getMenuTheme() {
  return localStorage.getItem('menuTheme');
}

export function setMenuTheme(menuTheme: string) {
  localStorage.setItem('menuTheme', menuTheme);
}

export function isDarkMenuTheme(menuTheme?: string) {
  return (menuTheme || getMenuTheme()) === 'dark';
}
