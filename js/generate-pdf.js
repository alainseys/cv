const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  // Generate Dutch CV
  await page.goto("file://" + process.cwd() + "/index.html", {
    waitUntil: "networkidle0"
  });

  // Set language to Dutch before generating PDF
  await page.evaluate(() => {
    document.getElementById('languageSelect').value = 'nl';
    const event = new Event('change');
    document.getElementById('languageSelect').dispatchEvent(event);
  });

  // Wait for content to switch
  await page.waitForSelector('#dutch-content[style*="block"], #dutch-content:not([style*="none"])');
  await page.waitForTimeout(500); // Extra delay for rendering

  await page.pdf({
    path: "cv-nl.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  });

  console.log("Dutch PDF generated");

  // Generate English CV
  await page.evaluate(() => {
    document.getElementById('languageSelect').value = 'en';
    const event = new Event('change');
    document.getElementById('languageSelect').dispatchEvent(event);
  });

  // Wait for content to switch
  await page.waitForSelector('#english-content[style*="block"], #english-content:not([style*="none"])');
  await page.waitForTimeout(500); // Extra delay for rendering

  await page.pdf({
    path: "cv-en.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  });

  console.log("English PDF generated");

  await browser.close();
})();
