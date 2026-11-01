from pathlib import Path
import shutil
root=Path(__file__).parent.parent
products=Path('C:/Users/HP/Documents/Codex/2026-10-25/e-book-chat-gpt-application-200/output')
for source,target in [
 ('PAVNO-Kids-Color-Story/qa-A4-01.png','assets/kids-color-preview.png'),
 ('PAVNO-Kids-Color-Story/qa-A4-03.png','assets/kids-color-activity-preview.png'),
 ('PAVNO-Kids-Math/qa-A4-01.png','assets/kids-math-preview.png'),
 ('PAVNO-Kids-Color-Story/PAVNO-Color-and-Tell-Free-Sample-3p.pdf','samples/kids-color-story-3p.pdf'),
 ('PAVNO-Kids-Math/PAVNO-Add-Subtract-Sample-4p.pdf','samples/kids-add-subtract-4p.pdf'),
 ('PAVNO-Kids-Color-Story/PAVNO-Color-and-Tell-Sample-EN-3p.pdf','samples/kids-color-story-en-3p.pdf'),
 ('PAVNO-Kids-Math/PAVNO-Add-Subtract-Sample-EN-4p.pdf','samples/kids-add-subtract-en-4p.pdf')]:
 dest=root/'dist'/target;dest.parent.mkdir(exist_ok=True,parents=True);shutil.copyfile(products/source,dest)
p=root/'dist/demo/index.html';s=p.read_text(encoding='utf-8')
anchor="$('#main').insertAdjacentHTML('beforeend',launchSample(p));"
if "if(p.id.startsWith('kids-'))" not in s:
 assert anchor in s
 s=s.replace(anchor,"if(p.id.startsWith('kids-')) $('#book-sample')?.remove();\n"+anchor,1)
 p.write_text(s,encoding='utf-8')
print('Added public samples only; full products remain outside dist.')
