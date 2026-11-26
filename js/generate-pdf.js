const puppeteer = require("puppeteer");
const path = require("path");
const { pathToFileURL } = require("url");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    const page = await browser.newPage();
    const indexUrl = pathToFileURL(path.join(process.cwd(), "index.html")).href;

    await page.goto(indexUrl, { waitUntil: "networkidle0" });
    await page.emulateMediaType("print");
    await page.evaluateHandle("document.fonts.ready");

    async function generatePdf(language, outputPath) {
      await page.select("#languageSelect", language);

      await page.waitForFunction((selectedLanguage) => {
        const nl = document.getElementById("dutch-content");
        const en = document.getElementById("english-content");
        return selectedLanguage === "nl"
          ? getComputedStyle(nl).display !== "none" && getComputedStyle(en).display === "none"
          : getComputedStyle(nl).display === "none" && getComputedStyle(en).display !== "none";
      }, {}, language);

      await page.pdf({
        path: outputPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: "0", bottom: "0", left: "0", right: "0" }
      });

      console.log(`${outputPath} generated`);
    }

    await generatePdf("nl", "cv-nl.pdf");
    await generatePdf("en", "cv-en.pdf");
  } finally {
    await browser.close();
  }
})();
