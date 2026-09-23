import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const here = dirname(fileURLToPath(import.meta.url));
const social = resolve(here, '..');
const sources = join(social, 'sources');
const posts = join(social, 'posts');
const comparison = join(social, 'comparison');
mkdirSync(sources, { recursive: true });
mkdirSync(posts, { recursive: true });
mkdirSync(comparison, { recursive: true });

const W = 1080;
const H = 1080;
const red = '#d51e28';
const ink = '#0b0b0c';
const paper = '#f0efec';
const muted = '#a7a8ab';
const font = "font-family='Helvetica,Arial,sans-serif'";
const img = (name, extra = '') => `<image href="../../assets/images/${name}" width="1080" height="1080" preserveAspectRatio="xMidYMid slice" ${extra}/>`;
const safe = value => value.replaceAll('&', '&amp;');
const line = (x1,y1,x2,y2,stroke=red,width=3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}"/>`;

function frame(content, { bg = ink, title = '', number = '', dark = true } = {}) {
  const fg = dark ? '#ffffff' : '#111114';
  const subtle = dark ? '#b5b6b9' : '#66676a';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="1080" height="1080" fill="${bg}"/>
  ${content}
  <g ${font} fill="${fg}">
    ${number ? `<text x="70" y="82" font-size="19" font-weight="700" letter-spacing="4">${number}</text>` : ''}
    ${title ? `<text x="1010" y="82" text-anchor="end" font-size="17" font-weight="700" letter-spacing="3">${safe(title)}</text>` : ''}
    <text x="70" y="1030" font-size="15" font-weight="700" letter-spacing="3" fill="${subtle}">PROPUESTA DE CONTENIDO · NO OFICIAL</text>
    <text x="1010" y="1030" text-anchor="end" font-size="15" font-weight="700" letter-spacing="3" fill="${subtle}">MIAMI</text>
  </g>
</svg>`;
}

const svgs = {
  '01.svg': frame(`
    ${img('project-02.jpg')}
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".05"/><stop offset=".63" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".92"/></linearGradient></defs>
    <rect width="1080" height="1080" fill="url(#g)"/>
    <rect x="70" y="105" width="8" height="68" fill="${red}"/>
    <g ${font} fill="#fff"><text x="104" y="130" font-size="19" font-weight="700" letter-spacing="4">CONSTRU·ART</text><text x="104" y="160" font-size="15" letter-spacing="6">MIAMI LLC</text>
    <text x="70" y="812" font-size="79" font-weight="800" letter-spacing="-4">ESPACIOS QUE</text><text x="70" y="890" font-size="79" font-weight="800" letter-spacing="-4">SE SIENTEN NUEVOS.</text>
    <text x="73" y="942" font-size="22" letter-spacing="4">BAÑO RESIDENCIAL · INSTALACIÓN Y TERMINACIONES</text></g>
  `, { number: '01 / 06', title: 'REMODELING · TILE · PAINTING' }),

  '02.svg': frame(`
    <path d="M720 0H1080V1080H604Z" fill="#161619"/>
    <rect x="70" y="135" width="72" height="8" fill="${red}"/>
    <g ${font} fill="#fff"><text x="70" y="285" font-size="100" font-weight="800" letter-spacing="-5">REMODELING</text><text x="70" y="435" font-size="100" font-weight="800" letter-spacing="-5" fill="none" stroke="#85868a" stroke-width="2">TILE</text><text x="70" y="585" font-size="100" font-weight="800" letter-spacing="-5">PAINTING</text>
    <text x="70" y="700" font-size="25" fill="#c4c5c8">Transformaciones residenciales y comerciales.</text><text x="70" y="740" font-size="25" fill="#c4c5c8">Baños · closets · interiores · exteriores.</text>
    <text x="70" y="900" font-size="18" font-weight="700" letter-spacing="5" fill="${red}">FORMA · FUNCIÓN · ACABADO</text></g>
    <g fill="${red}" transform="translate(845 540) skewX(-7)"><rect x="0" y="0" width="34" height="260"/><rect x="58" y="55" width="34" height="205"/><rect x="116" y="110" width="34" height="150"/></g>
  `, { number: '02 / 06', title: 'SERVICIOS' }),

  '03.svg': frame(`
    ${img('project-03.jpg')}
    <defs><linearGradient id="g3" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".86"/><stop offset=".66" stop-color="#000" stop-opacity=".08"/></linearGradient></defs><rect width="1080" height="1080" fill="url(#g3)"/>
    <g ${font} fill="#fff"><text x="70" y="360" font-size="23" font-weight="700" letter-spacing="6" fill="${red}">PROYECTO · COMERCIAL</text><text x="70" y="452" font-size="92" font-weight="800" letter-spacing="-5">UN INTERIOR</text><text x="70" y="540" font-size="92" font-weight="800" letter-spacing="-5">LISTO PARA</text><text x="70" y="628" font-size="92" font-weight="800" letter-spacing="-5">OPERAR.</text>
    <text x="73" y="692" font-size="23" fill="#d5d5d7">Piso, iluminación y superficies en un sistema visual limpio.</text></g>
  `, { number: '03 / 06', title: 'TRANSFORMACIÓN INTERIOR' }),

  '04.svg': frame(`
    <clipPath id="photo"><rect x="505" y="0" width="575" height="1080"/></clipPath><g clip-path="url(#photo)">${img('project-01.jpg')}</g>
    <rect x="0" y="0" width="505" height="1080" fill="${paper}"/>
    <g ${font} fill="#111114"><text x="70" y="260" font-size="22" font-weight="700" letter-spacing="5" fill="${red}">TRABAJO EN PROCESO</text><text x="70" y="370" font-size="62" font-weight="800" letter-spacing="-2">PREPARAR</text><text x="70" y="440" font-size="62" font-weight="800" letter-spacing="-2">TAMBIÉN ES</text><text x="70" y="510" font-size="62" font-weight="800" letter-spacing="-2">CONSTRUIR.</text>
    <text x="70" y="625" font-size="23" fill="#66676a">Evaluar. Intervenir.</text><text x="70" y="662" font-size="23" fill="#66676a">Revisar el acabado.</text></g>
    <rect x="475" y="160" width="60" height="8" fill="${red}"/>
  `, { bg: paper, number: '04 / 06', title: 'PROCESO', dark: false }),

  '05.svg': frame(`
    ${img('project-04.jpg')}
    <rect x="0" y="0" width="1080" height="1080" fill="#000" opacity=".05"/>
    <rect x="0" y="518" width="1080" height="44" fill="${ink}"/>
    <g ${font} fill="#fff"><text x="70" y="120" font-size="22" font-weight="700" letter-spacing="5">ANTES</text><text x="70" y="650" font-size="22" font-weight="700" letter-spacing="5">DESPUÉS</text><text x="70" y="934" font-size="66" font-weight="800" letter-spacing="-3">EL CAMBIO VIVE</text><text x="70" y="998" font-size="66" font-weight="800" letter-spacing="-3">EN LOS DETALLES.</text></g>
    <circle cx="1012" cy="540" r="29" fill="${red}"/><path d="M1000 540h24m-10-10 10 10-10 10" fill="none" stroke="#fff" stroke-width="4"/>
  `, { number: '05 / 06', title: 'ANTES / DESPUÉS' }),

  '06.svg': frame(`
    ${img('project-06.jpg')}
    <defs><linearGradient id="g6" x1="0" y1="0" x2="0" y2="1"><stop offset=".15" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".86"/></linearGradient></defs><rect width="1080" height="1080" fill="url(#g6)"/>
    <rect x="70" y="118" width="310" height="54" fill="${paper}"/><text x="225" y="153" text-anchor="middle" ${font} font-size="17" font-weight="700" letter-spacing="4" fill="#111114">CLOSET A MEDIDA</text>
    <g ${font} fill="#fff"><text x="70" y="824" font-size="88" font-weight="800" letter-spacing="-4">ORDEN, LUZ</text><text x="70" y="910" font-size="88" font-weight="800" letter-spacing="-4">Y FUNCIÓN.</text><text x="73" y="960" font-size="22" letter-spacing="3">ALMACENAMIENTO E ILUMINACIÓN INTEGRADA</text></g>
  `, { number: '06 / 06', title: 'INTERIORES' })
};

const avatarSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="${ink}"/><circle cx="540" cy="540" r="386" fill="none" stroke="#303034" stroke-width="2"/><g fill="${red}" transform="translate(355 286) skewX(-7)"><rect width="78" height="508"/><rect x="124" y="88" width="78" height="420"/><rect x="248" y="176" width="78" height="332"/></g><g ${font} fill="#fff" text-anchor="middle"><text x="540" y="875" font-size="51" font-weight="800" letter-spacing="9">CONSTRU·ART</text><text x="540" y="930" font-size="24" letter-spacing="13" fill="#a9aaad">MIAMI LLC</text></g></svg>`;

const comparisonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><defs><clipPath id="top"><rect width="1080" height="515"/></clipPath><clipPath id="bottom"><rect y="565" width="1080" height="515"/></clipPath></defs><rect width="1080" height="1080" fill="${ink}"/><g clip-path="url(#top)">${img('project-04.jpg')}</g><g clip-path="url(#bottom)">${img('project-04.jpg')}</g><rect y="515" width="1080" height="50" fill="${ink}"/><g ${font} fill="#fff"><rect x="54" y="52" width="168" height="56" rx="3" fill="${ink}" opacity=".9"/><text x="138" y="89" text-anchor="middle" font-size="22" font-weight="700" letter-spacing="4">ANTES</text><rect x="54" y="613" width="208" height="56" rx="3" fill="${red}"/><text x="158" y="650" text-anchor="middle" font-size="22" font-weight="700" letter-spacing="4">DESPUÉS</text><text x="1010" y="548" text-anchor="end" font-size="16" font-weight="700" letter-spacing="3">EVIDENCIA FOTOGRÁFICA LOCAL</text><text x="54" y="1040" font-size="15" font-weight="700" letter-spacing="3">PROPUESTA SOCIAL · NO OFICIAL</text></g></svg>`;

function writeSvg(name, content) { writeFileSync(join(sources, name), content); }
function render(source, output) {
  const original = join(sources, source);
  const materialized = join(sources, `.render-${source}`);
  const svg = readFileSync(original, 'utf8').replaceAll(/href="([^"#][^"]*)"/g, (_match, href) => {
    const absolute = resolve(sources, href);
    return `href="file://${absolute}"`;
  });
  writeFileSync(materialized, svg);
  try {
    execFileSync('magick', ['-background', 'none', materialized, '-strip', '-define', 'png:color-type=6', output], { stdio: 'inherit' });
  } finally {
    rmSync(materialized, { force: true });
  }
}

for (const [name, svg] of Object.entries(svgs)) writeSvg(name, svg);
writeSvg('avatar.svg', avatarSvg);
writeSvg('before-after.svg', comparisonSvg);
for (const name of Object.keys(svgs)) render(name, join(posts, name.replace('.svg', '.png')));
render('avatar.svg', join(social, 'avatar.png'));
render('before-after.svg', join(comparison, 'before-after.png'));

const gridSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080"><rect width="1080" height="1080" fill="#f7f7f6"/><circle cx="126" cy="120" r="65" fill="${ink}"/><g fill="${red}" transform="translate(95 83) skewX(-7)"><rect width="13" height="76"/><rect x="21" y="13" width="13" height="63"/><rect x="42" y="26" width="13" height="50"/></g><g ${font} fill="#151517"><text x="220" y="88" font-size="30" font-weight="800">CONSTRU·ART MIAMI</text><text x="220" y="126" font-size="20" fill="#65666a">Remodeling · Tile · Painting · Miami</text><text x="220" y="162" font-size="17" font-weight="700" fill="${red}">PROPUESTA DE PERFIL · NO OFICIAL</text></g><line x1="54" y1="218" x2="1026" y2="218" stroke="#d1d1d0"/><g>
${['01','02','03','04','05','06'].map((n,i)=>{const x=54+(i%3)*326;const y=252+Math.floor(i/3)*326;return `<image href="../posts/${n}.png" x="${x}" y="${y}" width="310" height="310" preserveAspectRatio="xMidYMid slice"/>`;}).join('')}
</g><g ${font}><text x="54" y="965" font-size="20" font-weight="700" fill="#151517">Sistema visual</text><text x="54" y="998" font-size="17" fill="#65666a">Negro industrial · rojo señal · fotografía de obra real · tipografía directa</text><text x="1026" y="1032" text-anchor="end" font-size="14" font-weight="700" letter-spacing="2" fill="#77787b">MOCKUP CONCEPTUAL</text></g></svg>`;
writeSvg('profile-grid-mockup.svg', gridSvg);
render('profile-grid-mockup.svg', join(social, 'profile-grid mockup.png'));
console.log('Constru-Art social package generated.');
