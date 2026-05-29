from playwright.sync_api import sync_playwright
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parent
html = (ROOT / "equity-full-report" / "index.html").resolve()
url = f"file://{html}"
out_dir = ROOT / "render-check-output"
out_dir.mkdir(parents=True, exist_ok=True)

targets = [
    ("top", "#s0-map"),
    ("s3-5", "#s3-5"),
    ("s9-2", "#s9-2"),
    ("s10-2", "#s10-2"),
]

results = {"url": url, "errors": [], "sections": []}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1600, "height": 1100})
    page.set_default_navigation_timeout(120000)

    page.on("console", lambda msg: results["errors"].append({"type": msg.type, "text": msg.text}) if msg.type == "error" else None)
    page.on("pageerror", lambda exc: results["errors"].append({"type": "pageerror", "text": str(exc)}))

    page.goto(url)
    page.wait_for_load_state("load")
    page.wait_for_timeout(1500)

    page.screenshot(path=str(out_dir / "full-page.png"), full_page=True)

    for name, selector in targets:
        loc = page.locator(selector)
        count = loc.count()
        info = {"name": name, "selector": selector, "count": count}
        if count:
            loc.first.scroll_into_view_if_needed()
            page.wait_for_timeout(300)
            loc.first.screenshot(path=str(out_dir / f"{name}.png"))
            box = loc.first.bounding_box()
            info["box"] = box
        results["sections"].append(info)

    browser.close()

(out_dir / "render-results.json").write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(json.dumps(results, ensure_ascii=False, indent=2))
