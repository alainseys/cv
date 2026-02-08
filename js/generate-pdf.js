const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("file://" + process.cwd() + "/index.html", {
    waitUntil: "networkidle0"
  });

  await page.pdf({
    path: "cv.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  });

  await browser.close();

  console.log("PDF generated");
})();
