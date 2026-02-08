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

  // Wait for content to switch - use waitForFunction instead of waitForTimeout
  await page.waitForFunction(() => {
    const dutchContent = document.getElementById('dutch-content');
    const englishContent = document.getElementById('english-content');
    return dutchContent.style.display === 'block' && englishContent.style.display === 'none';
  }, { timeout: 5000 });

  // Use setTimeout wrapped in page.evaluate for delay
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 500));
  });

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
  await page.waitForFunction(() => {
    const dutchContent = document.getElementById('dutch-content');
    const englishContent = document.getElementById('english-content');
    return dutchContent.style.display === 'none' && englishContent.style.display === 'block';
  }, { timeout: 5000 });

  // Use setTimeout wrapped in page.evaluate for delay
  await page.evaluate(() => {
    return new Promise(resolve => setTimeout(resolve, 500));
  });

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
