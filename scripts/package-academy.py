from pathlib import Path
from html.parser import HTMLParser
from zipfile import ZipFile, ZIP_DEFLATED
root=Path(__file__).resolve().parents[1]
dist=root/'dist'
class Check(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for k,v in attrs:
            if k in ('src','href') and v.startswith('/'):
                path=dist/v.split('?')[0].lstrip('/')
                assert path.exists(),str(path)
Check().feed((dist/'index.html').read_text(encoding='utf-8'))
out=Path('C:/Users/HP/Documents/Codex/2026-10-25/e-book-chat-gpt-application-200/output/PAVNO-Web-Release/PAVNO-Academy-Layout.zip')
out.parent.mkdir(parents=True,exist_ok=True)
with ZipFile(out,'w',ZIP_DEFLATED) as z:
    for p in dist.rglob('*'):
        if p.is_file():z.write(p,p.relative_to(root))
    for name in ['vercel.json','package.json','scripts/redesign-home.py']:
        z.write(root/name,name)
print('Links verified; release ZIP created:',out)
