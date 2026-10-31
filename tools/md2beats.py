"""Full-script markdown (## Chapter N … ## Sources) → beats c<N>_<nn> appended to pipeline/episodes/<id>.json.
⟨…⟩ = screen notes (dropped), [Sx] = src, **…** = punch line (longer pause, more exag). Usage: py tools/md2beats.py ea1"""
import re, json, sys
ep = sys.argv[1]
s = open(f'pipeline/episodes/{ep}_full_script.md', encoding='utf8').read()
body = s[s.index('## Chapter 1'):s.index('## Sources')]
beats, ch, n = [], 0, 0
for para in re.split(r'\n\s*\n', body):
    para = para.strip()
    if para.startswith('## Chapter'):
        ch, n = ch + 1, 0
        para = para.split('\n', 1)[1].strip() if '\n' in para else ''
    for line in para.split('\n'):
        src = ' '.join(re.findall(r'\[(S\d+)\]', line))
        t = re.sub(r'⟨[^⟩]*⟩', '', line)
        t = re.sub(r'\[S\d+\]', '', t).replace('**', '')
        t = re.sub(r'⚠ ELECTION LINE \([^)]*\):', '', t).replace('…', ' ...')
        t = re.sub(r'\s+', ' ', t).strip()
        if not t or t.startswith('---'):
            continue
        n += 1
        punch = len(t.split()) <= 9
        b = {'id': f'c{ch}_{n:02d}', 'src': src, 'text': t, 'pause': 0.6 if punch else 0.35}
        if punch:
            b['exag'] = 0.55
        beats.append(b)
j = f'pipeline/episodes/{ep}.json'
d = json.load(open(j, encoding='utf8'))
d['beats'] = [b for b in d['beats'] if not re.match(r'c\d+_', b['id'])] + beats
json.dump(d, open(j, 'w', encoding='utf8'), indent=2, ensure_ascii=False)
w = sum(len(b['text'].split()) for b in d['beats'])
print(len(beats), 'body beats |', w, 'words total ~', round(w / 190 + len(d['beats']) * 0.4 / 60, 1), 'min at 190 wpm')
