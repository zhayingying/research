from pathlib import Path
import re
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
html_path = ROOT / "report" / "index.html"
out_path = ROOT / "output" / "link-check-results.json"
html = html_path.read_text()
urls = sorted(set(re.findall(r'href=\"(https?://[^\"]+)\"', html)))
results = []

headers = [
    "-A",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/126.0 Safari/537.36",
]


def check(url, method):
    cmd = [
        "curl",
        "-L",
        "--max-time",
        "20",
        "-o",
        "/dev/null",
        "-s",
        "-w",
        "%{http_code} %{url_effective}",
        *headers,
    ]
    if method == "HEAD":
        cmd.insert(1, "-I")
    cmd.append(url)
    proc = subprocess.run(cmd, capture_output=True, text=True)
    stdout = proc.stdout.strip()
    if not stdout:
        return {"status": "ERR", "effective": "", "returncode": proc.returncode}
    parts = stdout.split(" ", 1)
    return {
        "status": parts[0],
        "effective": parts[1] if len(parts) > 1 else "",
        "returncode": proc.returncode,
    }


for url in urls:
    head = check(url, "HEAD")
    final = head
    method = "HEAD"
    if not (head["status"].isdigit() and 200 <= int(head["status"]) < 400):
        final = check(url, "GET")
        method = "GET"
    status = final["status"]
    results.append({
        "url": url,
        "status": status,
        "effective": final["effective"],
        "method": method,
        "head_status": head["status"],
        "ok": status.isdigit() and 200 <= int(status) < 400,
    })

out_path.parent.mkdir(parents=True, exist_ok=True)
out_path.write_text(json.dumps(results, ensure_ascii=False, indent=2))
print(json.dumps(results, ensure_ascii=False, indent=2))
