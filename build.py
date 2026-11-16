#!/usr/bin/env python3
"""Builds the static site: src/pages/**/*.html + src/layout.html + src/partials -> repo root.
Run:  python3 build.py        (no dependencies)"""
import pathlib, re, datetime

ROOT = pathlib.Path(__file__).resolve().parent
SRC = ROOT / "src"
SITE = "https://google-fix-my-biz.vercel.app"
BRAND = "googlefixmybiz"

read = lambda p: p.read_text(encoding="utf-8")
layout = read(SRC / "layout.html")
partial = {n: read(SRC / "partials" / f"{n}.html") for n in ("sprite", "header", "footer", "banner") if (SRC / "partials" / f"{n}.html").exists()}

def front(text):
    m = re.match(r"\s*<!--\s*\n(.*?)\n-->\s*", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip()] = v.strip()
        text = text[m.end():]
    return meta, text

def esc(s):
    return s.replace("&", "&amp;").replace('"', "&quot;").replace("<", "&lt;")

urls = []
for page in sorted((SRC / "pages").rglob("*.html")):
    rel = page.relative_to(SRC / "pages")
    meta, body = front(read(page))
    slug = rel.with_suffix("").as_posix()
    is_home = slug == "index"
    nav = meta.get("nav", slug.split("/")[0])
    title = meta.get("title_full") or (meta["title"] + " | " + BRAND if "title" in meta else BRAND)
    desc = meta.get("description", "Google Business Profile recovery, local rankings and review management.")
    canonical = SITE + "/" + ("" if is_home else slug)

    content, _, scripts = body.partition("<!-- scripts -->")

    header = partial["header"]
    header = re.sub(r'data-nav="([^"]+)"', lambda m: 'aria-current="page"' if m.group(1) == nav else "", header)
    extra_css = "\n".join(f'<link rel="stylesheet" href="/assets/{c.strip()}.css">' for c in meta.get("css", "").split(",") if c.strip())
    pre = partial.get(meta.get("pre_header", ""), "")

    html = layout
    for k, v in {
        "{{title}}": esc(title), "{{description}}": esc(desc), "{{canonical}}": canonical, "{{site}}": SITE,
        "{{extra_css}}": extra_css, "{{sprite}}": partial["sprite"], "{{pre_header}}": pre,
        "{{header}}": header, "{{footer}}": partial["footer"], "{{content}}": content.strip(), "{{scripts}}": scripts.strip(),
    }.items():
        html = html.replace(k, v)

    out = ROOT / rel
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")
    if slug != "404":
        urls.append((canonical, meta.get("priority", "1.0" if is_home else "0.7")))
    print("built", rel)

today = datetime.date.today().isoformat()
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
sm += [f"  <url><loc>{u}</loc><lastmod>{today}</lastmod><priority>{p}</priority></url>" for u, p in urls]
sm.append("</urlset>")
(ROOT / "sitemap.xml").write_text("\n".join(sm) + "\n", encoding="utf-8")
(ROOT / "robots.txt").write_text(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n", encoding="utf-8")
print(f"{len(urls)} pages in sitemap")
