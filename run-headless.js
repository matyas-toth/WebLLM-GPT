const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Interact with the page or take screenshots if needed
  // For example, to take a screenshot:
  // await page.screenshot({ path: 'screenshot.png' });

  // Close the browser when done
  await browser.close();
})();