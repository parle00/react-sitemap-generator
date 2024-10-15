const fs = require("fs");
const path = require("path");
const builder = require("xmlbuilder");
const config = require("./seo-config.json"); // Config dosyasını içe aktarıyoruz

const generateSitemap = () => {
  if (config.generateSitemap) {
    // Eğer generateSitemap true ise
    const baseUrl = config.baseUrl;
    const routes = config.routes;

    // XML yapısını oluştur
    const urlset = builder
      .create("urlset", { version: "1.0", encoding: "UTF-8" })
      .att("xmlns", "http://www.sitemaps.org/schemas/sitemap-image.v1")
      .att("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
      .att(
        "xsi:schemaLocation",
        "http://www.sitemaps.org/schemas/sitemap-image.v1"
      );

    const currentDate = new Date().toISOString(); // Oluşturulma tarihini al

    routes.forEach((route) => {
      urlset
        .ele("url")
        .ele("loc", `${baseUrl}${route}`)
        .up()
        .ele("lastmod", currentDate)
        .up() // Oluşturulma tarihi
        .ele("changefreq", "daily")
        .up()
        .ele("priority", "0.5");
    });

    const sitemapXml = urlset.end({ pretty: true });

    // Sitemap'i dosyaya yaz
    fs.writeFileSync(path.resolve(__dirname, "sitemap.xml"), sitemapXml);
    console.log("Sitemap created successfully!");
  } else {
    console.log("Sitemap generation is disabled in config.");
  }
};

generateSitemap();
