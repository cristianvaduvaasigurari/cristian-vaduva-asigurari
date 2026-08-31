const { execSync } = require("child_process");
const fs = require("fs");

const url = "http://localhost:3015";
const runs = [];

for (let i = 1; i <= 5; i++) {
  const outputPath = `scratch_lh_mobile_run_${i}.json`;
  console.log(`Running Mobile Lighthouse Audit #${i} on ${url}...`);
  try {
    execSync(`npx lighthouse ${url} --chrome-flags="--headless=new" --output=json --output-path=${outputPath}`, { stdio: "ignore" });
    const r = JSON.parse(fs.readFileSync(outputPath));
    runs.push({
      run: i,
      perf: Math.round(r.categories.performance.score * 100),
      a11y: Math.round(r.categories.accessibility.score * 100),
      bp: Math.round(r.categories["best-practices"].score * 100),
      seo: Math.round(r.categories.seo.score * 100),
      fcp: r.audits["first-contentful-paint"]?.displayValue || "N/A",
      lcp: r.audits["largest-contentful-paint"]?.displayValue || "N/A",
      tbt: r.audits["total-blocking-time"]?.displayValue || "N/A",
      cls: r.audits["cumulative-layout-shift"]?.displayValue || "N/A",
      si: r.audits["speed-index"]?.displayValue || "N/A"
    });
    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error(`Error during run ${i}:`, err.message);
  }
}

console.log("=== 5 MOBILE RUNS RESULTS ===");
console.log(JSON.stringify(runs, null, 2));
fs.writeFileSync("lh_5_mobile_results.json", JSON.stringify(runs, null, 2));
