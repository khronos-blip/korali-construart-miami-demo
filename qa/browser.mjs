import { createRequire } from 'node:module';
import { writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from './server.mjs';

const require = createRequire(import.meta.url);
const { chromium } = require('../../../node_modules/playwright-core');
const output = resolve(import.meta.dirname, 'outputs');
await mkdir(output, { recursive: true });
const server = await createServer(0);
const port = server.address().port;
const base = `http://127.0.0.1:${port}`;
const url = `${base}/demos/construart-miami/`;
const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const report = { url, viewports: [], interactions: {}, consoleErrors: [], pageErrors: [], failedRequests: [], offOriginRequests: [] };
const assert = (condition, message) => { if (!condition) throw new Error(message); };

async function testViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on('console', (message) => { if (message.type() === 'error') report.consoleErrors.push(`${name}: ${message.text()}`); });
  page.on('pageerror', (error) => report.pageErrors.push(`${name}: ${error.message}`));
  page.on('requestfailed', (request) => report.failedRequests.push(`${name}: ${request.url()} — ${request.failure()?.errorText}`));
  page.on('request', (request) => { if (!request.url().startsWith(base)) report.offOriginRequests.push(`${name}: ${request.url()}`); });

  await page.goto(url, { waitUntil: 'networkidle' });
  assert(await page.getByText('Página web demo no oficial; formularios sin envío', { exact: true }).isVisible(), `${name}: disclosure missing`);
  await page.evaluate(async () => {
    const images = [...document.images];
    images.forEach((image) => { image.loading = 'eager'; });
    await Promise.all(images.map((image) => image.complete
      ? Promise.resolve()
      : new Promise((resolveImage) => {
          image.addEventListener('load', resolveImage, { once: true });
          image.addEventListener('error', resolveImage, { once: true });
        })));
  });
  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  assert(overflow.scrollWidth <= overflow.clientWidth + 1, `${name}: horizontal overflow ${overflow.scrollWidth}/${overflow.clientWidth}`);
  const broken = await page.evaluate(() => [...document.images].filter((image) => !image.naturalWidth).map((image) => image.src));
  assert(broken.length === 0, `${name}: broken images: ${broken.join(', ')}`);
  const phones = await page.locator('a[href^="tel:"]').evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')))]);
  assert(phones.includes('tel:+17863955814') && phones.includes('tel:+17866087412'), `${name}: phone links incomplete`);

  if (name === 'desktop') {
    const expected = { Interiores: 2, Exteriores: 3, Comercial: 1, Todos: 6 };
    for (const [label, count] of Object.entries(expected)) {
      await page.getByRole('button', { name: label, exact: true }).click();
      const visible = await page.locator('.project-card:visible').count();
      assert(visible === count, `Filter ${label}: expected ${count}, got ${visible}`);
    }
    report.interactions.filters = 'pass';

    await page.locator('#cotizar').scrollIntoViewIfNeeded();
    await page.locator('.form-step[data-step="1"] .next-step').click();
    assert(await page.locator('.form-step[data-step="1"] .form-error').isVisible(), 'Estimator validation did not run');
    await page.getByLabel('Remodelación').check();
    await page.locator('.form-step[data-step="1"] .next-step').click();
    await page.locator('select[name="space"]').selectOption({ label: 'Residencial' });
    await page.locator('select[name="timing"]').selectOption({ label: 'Próximos meses' });
    await page.locator('.form-step[data-step="2"] .next-step').click();
    assert((await page.locator('[data-summary]').textContent()).includes('Remodelación'), 'Estimator summary missing service');
    await page.locator('input[name="name"]').fill('Prueba local');
    await page.locator('input[name="phone"]').fill('(786) 000-0000');
    await page.getByRole('button', { name: 'Completar simulación' }).click();
    assert(await page.getByText('Resumen preparado.').isVisible(), 'Estimator success missing');
    report.interactions.estimator = 'pass';
  } else {
    await page.locator('.menu-toggle').click();
    assert(await page.locator('.site-nav').evaluate((node) => node.classList.contains('is-open')), 'Mobile menu did not open');
    await page.getByRole('link', { name: 'Proyectos', exact: true }).click();
    assert(await page.locator('.menu-toggle').getAttribute('aria-expanded') === 'false', 'Mobile menu did not close');
    assert(await page.locator('.mobile-callbar').isVisible(), 'Mobile call bar missing');
    report.interactions.mobileNavigation = 'pass';
  }

  await page.screenshot({ path: resolve(output, `${name}.png`), fullPage: true });
  report.viewports.push({ name, ...viewport, overflow, brokenImages: broken.length });
  await page.close();
}

try {
  await testViewport('desktop', { width: 1440, height: 1000 });
  await testViewport('mobile', { width: 390, height: 844 });
  assert(report.consoleErrors.length === 0, `Console errors: ${report.consoleErrors.join('; ')}`);
  assert(report.pageErrors.length === 0, `Page errors: ${report.pageErrors.join('; ')}`);
  assert(report.failedRequests.length === 0, `Failed requests: ${report.failedRequests.join('; ')}`);
  assert(report.offOriginRequests.length === 0, `Off-origin requests: ${report.offOriginRequests.join('; ')}`);
  report.status = 'pass';
} catch (error) {
  report.status = 'fail';
  report.error = error.stack;
  throw error;
} finally {
  await writeFile(resolve(output, 'browser-report.json'), JSON.stringify(report, null, 2));
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
  console.log(JSON.stringify(report, null, 2));
}
