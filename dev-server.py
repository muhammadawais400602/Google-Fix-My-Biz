#!/usr/bin/env python3
"""Local preview that mimics Vercel clean URLs (/pricing -> pricing.html).
Usage: python3 dev-server.py [port]   (default 8000)"""
import http.server, os, sys

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        path = path.split('?', 1)[0].split('#', 1)[0]
        p = os.path.join(ROOT, path.lstrip('/'))
        if os.path.isdir(p):
            p = os.path.join(p, 'index.html')
        if not os.path.exists(p) and os.path.exists(p + '.html'):
            p += '.html'
        return p if os.path.exists(p) else os.path.join(ROOT, '404.html')

    def log_message(self, *args):
        pass


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    print(f'http://127.0.0.1:{port}')
    http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
