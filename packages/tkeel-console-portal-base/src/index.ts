import configs from './configs';

const config = configs[PORTAL_GLOBALS.client.themeName];
const documentTile = config.documentTiles[PORTAL_GLOBALS.portalName];
document.title = documentTile;

// eslint-disable-next-line no-restricted-exports
export { default } from './App';
