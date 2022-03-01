import configs from './configs';

const config = configs[GLOBAL_CONFIG.client.themeName];
const documentTile = config.documentTiles[GLOBAL_CONFIG.portalName];
document.title = documentTile;

// eslint-disable-next-line no-restricted-exports
export { default } from './App';
