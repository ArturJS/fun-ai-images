const puppeteer = require("puppeteer");

const getNextImage = async ({ go, count }) => {
  const page = await go("https://thispersondoesnotexist.com");
  try {
    await page.waitForSelector("#face", {
      timeout: 3000
    });
    const elements = await page.$$("#face");
    const element = elements[0];

    await element.screenshot({ path: `./images/${count}.png` });
  } catch (err) {
    console.log({
      count,
      err
    });
  }
};

const main = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const go = async url => {
    await page.goto(url, { waitUntil: "networkidle0" });

    return page;
  };
  for (let count = 1; count < 10; count++) {
    console.log(`count: ${count}`);
    await getNextImage({ go, count });
  }

  await browser.close();
  console.log("Done!");
};

main().catch(err => {
  console.log("Some shit happened... See error details:");
  console.log(err);
});
