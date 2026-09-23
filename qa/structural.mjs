import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const html = await readFile(resolve(root, 'public/index.html'), 'utf8');
const fail = (message) => { throw new Error(message); };

const required = [
  'Página web demo no oficial; formularios sin envío',
  'Constru-Art Miami',
  '(786) 395-5814',
  '(786) 608-7412',
  'Remodeling',
  'Tile',
  'Painting'
];
required.forEach((text) => { if (!html.includes(text)) fail(`Missing required text: ${text}`); });

if (/<form[^>]+action=/i.test(html)) fail('Form must not define an action');
if (/https?:\/\//i.test(html)) fail('Public HTML contains an external URL');
if (/src=["'](?!\/demos\/construart-miami\/)/i.test(html)) fail('Found a non-prefix-safe src');
if (/href=["']\/(?!demos\/construart-miami\/)/i.test(html)) fail('Found a non-prefix-safe root href');

const imageRefs = [...html.matchAll(/src="(\/demos\/construart-miami\/assets\/images\/[^"]+)"/g)].map((match) => match[1]);
const uniqueImages = new Set(imageRefs);
if (uniqueImages.size !== 6) fail(`Expected 6 unique project images, found ${uniqueImages.size}`);
for (const path of uniqueImages) await access(resolve(root, 'public', path.replace('/demos/construart-miami/', '')));

const altMatches = [...html.matchAll(/<img\b[^>]*\balt="([^"]*)"[^>]*>/g)];
if (altMatches.length !== imageRefs.length) fail('Every image must have alt text');
if (altMatches.some((match) => !match[1].trim())) fail('Empty alt text found');

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
if (new Set(ids).size !== ids.length) fail('Duplicate HTML id found');

console.log(JSON.stringify({ status: 'pass', requiredText: required.length, uniqueProjectImages: uniqueImages.size, imageReferences: imageRefs.length, ids: ids.length }, null, 2));
