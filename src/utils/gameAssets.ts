
/**
 * Catálogo de jogos de eSports com SVGs embutidos, cores temáticas e imagens de fallback
 * 
 * Este módulo implementa um sistema de fallback em camadas para garantir que
 * os jogos de eSports sempre sejam exibidos de forma atraente, mesmo quando
 * as imagens externas falham ao carregar.
 * 
 * @module utils/gameAssets
 */

// Game logos como SVGs embutidos para máxima confiabilidade - primeira camada de fallback
export const gameSVGIcons = {
  "Counter-Strike 2": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#f2a000" d="M256 32c-13 0-23 5-32 13-10 7-15 16-15 25v95c0 3 1 5 3 6 5 5 15 4 15-5v-75c0-10 3-17 10-24 7-6 12-9 19-9s13 3 19 9c7 7 10 14 10 24v75c0 9 10 10 15 5 2-1 3-3 3-6V70c0-9-5-18-15-25-9-8-19-13-32-13z"/><path fill="#f2a000" d="M118 143c-15 22-23 47-23 74 0 36 14 69 36 94s53 43 86 49c7 1 15 2 23 2h2c41 0 80-19 106-49 27-32 36-65 34-104-1-25-7-50-21-74-11-20-27-46-55-55-9-3-20 1-24 9-3 5-3 10-1 15l5 12c2 5 3 9 3 14 0 8-3 15-9 20-5 6-13 9-20 9h-61c-7 0-15-3-20-9-6-5-9-12-9-20 0-5 1-9 3-14l5-12c2-5 2-10-1-15-4-8-15-12-24-9-28 9-44 35-55 55z"/></svg>`,
  "League of Legends": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#d0a85c" d="M256 42l39 80 89 13-65 62 16 88-79-43-79 43 15-88-64-62 89-13z"/><path fill="#d0a85c" d="M256 85v-43c-88 0-160 72-160 160 0 53 25 99 65 128h190c39-29 65-75 65-128 0-88-72-160-160-160zm0 256c-65 0-117-53-117-118 0-66 52-118 117-118s118 52 118 118c0 65-53 118-118 118z"/></svg>`,
  "Valorant": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fa4454" d="M102 136v240h70l25-30 82-90 82 90 28 30h20v-240h-70l-60 66-60-66z"/></svg>`,
  "Free Fire": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ffbe00" d="M272 64c-9 0-16 7-16 16v32c0 9 7 16 16 16s16-7 16-16V80c0-9-7-16-16-16zm112 64c-9 0-16 7-16 16v32c0 9 7 16 16 16s16-7 16-16v-32c0-9-7-16-16-16zm-224 32c-9 0-16 7-16 16v32c0 9 7 16 16 16s16-7 16-16v-32c0-9-7-16-16-16zm176 32c-4 0-8 1-11 4-7 6-7 16-1 23 2 3 5 48 5 85s-3 82-5 85c-6 7-6 17 1 23 3 3 7 4 11 4s8-1 11-4c26-28 29-103 29-108s-3-80-29-108c-3-3-7-4-11-4zm-48 16c-9 0-16 7-16 16v128c0 9 7 16 16 16s16-7 16-16V224c0-9-7-16-16-16zm-128 32c-4 0-8 1-11 4-7 6-7 16-1 23 2 3 5 32 5 69s-3 66-5 69c-6 7-6 17 1 23 3 3 7 4 11 4s8-1 11-4c26-28 29-87 29-92s-3-64-29-92c-3-3-7-4-11-4z"/></svg>`,
  "Rainbow Six Siege": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#2b3991" d="M256 64L128 448h30l128-384h30l128 384h30L256 64z"/><path fill="#2b3991" d="M256 352c-18 0-32 14-32 32s14 32 32 32 32-14 32-32-14-32-32-32z"/></svg>`,
  "Apex Legends": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#d13639" d="M256 64l-160 256h110l50-85 50 85h110L256 64z"/><path fill="#d13639" d="M241 341h30v85h-30z"/></svg>`,
  "FURIA": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#9b87f5" d="M256 64c-80 0-144 64-144 144v96c0 80 64 144 144 144s144-64 144-144v-96c0-80-64-144-144-144zm0 48c53 0 96 43 96 96v96c0 53-43 96-96 96s-96-43-96-96v-96c0-53 43-96 96-96z"/><path fill="#9b87f5" d="M208 160h32v192h-32zm64 0h32v192h-32z"/></svg>`,
};

// Game assets com URLs locais - opção mais confiável
export const gameAssets = {
  "Counter-Strike 2": "/assets/games/cs2.webp",
  "League of Legends": "/assets/games/lol.webp",
  "Valorant": "/assets/games/valorant.webp",
  "Free Fire": "/assets/games/freefire.webp",
  "Rainbow Six Siege": "/assets/games/r6.webp",
  "Apex Legends": "/assets/games/apex.webp",
  "FURIA": "/assets/games/furia.webp",
};

// URLs de fallback CDN caso as imagens locais não carreguem
export const gameFallbackUrls = {
  "Counter-Strike 2": "https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_616x353.jpg",
  "League of Legends": "https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff68d72c384b",
  "Valorant": "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt3f072336e3f3ade4/5e87de23b9a68c6cfa3a3169/Valorant_logo.jpg",
  "Free Fire": "https://sm.ign.com/ign_br/screenshot/default/garena-free-fire_qk5y.jpg",
  "Rainbow Six Siege": "https://cdn.cloudflare.steamstatic.com/steam/apps/359550/capsule_616x353.jpg",
  "Apex Legends": "https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/capsule_616x353.jpg",
  "FURIA": "https://www.furia.gg/static/images/logo-furia.svg",
};

// Cores temáticas para cada jogo (terceira camada de fallback)
export const gameThemeColors = {
  "Counter-Strike 2": "#1e2124",
  "League of Legends": "#0bc6e3",
  "Valorant": "#fa4454",
  "Free Fire": "#ffbe00",
  "Rainbow Six Siege": "#2b3991",
  "Apex Legends": "#d13639",
  "FURIA": "#9b87f5",
};

// Ícones textuais para cada jogo (quarta camada de fallback)
export const gameIcons = {
  "Counter-Strike 2": "CS2",
  "League of Legends": "LOL",
  "Valorant": "VAL",
  "Free Fire": "FF",
  "Rainbow Six Siege": "R6S",
  "Apex Legends": "APEX",
  "FURIA": "FURIA",
};

// Dados base64 de pequenas imagens otimizadas para maior confiabilidade 
// (não estou incluindo nenhuma para manter o arquivo leve, mas poderíamos adicionar)
export const gameImagesBase64 = {
  // "Counter-Strike 2": "data:image/png;base64,iVBOR...",
};
