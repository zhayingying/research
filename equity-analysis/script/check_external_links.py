from pathlib import Path
import re
import json
import subprocess

ROOT = Path(__file__).resolve().parent
html_path = ROOT / "equity-full-report" / "index.html"
out_path = ROOT / "render-check-output" / "link-check-results.json"
html = html_path.read_text()
urls = re.findall(r'href=\"(https?://[^\"]+)\"', html)
results = []

for url in urls:
    proc = subprocess.run(
        ["curl", "-I", "-L", "--max-time", "20", "-o", "/dev/null", "-s", "-w", "%{http_code} %{url_effective}", url],
        capture_output=True,
        text=True,
    )
    stdout = proc.stdout.strip()
    if stdout:
        parts = stdout.split(" ", 1)
        status = parts[0]
        effective = parts[1] if len(parts) > 1 else ""
    else:
        status = "ERR"
        effective = ""
    results.append({
        "url": url,
        "status": status,
        "effective": effective,
        "ok": status.isdigit() and 200 <= int(status) < 400,
    })

out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(json.dumps(results, ensure_ascii=False, indent=2))
