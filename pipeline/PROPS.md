# Procedural money props (`blender/props.py`) — for `tpl: "scene"` `hero` / `props`

Use where Poly Haven has no fitting model. Id = `p:<name>`; add words with `p:<name>=<text>` (e.g. `p:rent_sign=SOLD`, `p:phone=+$3,400`, `p:bar_chart_3d=2,4,9`).
Real size by default × a built-in display scale (tiny things become cartoon-giant); `hero_size` (metres tall) overrides it. Mix freely with Poly Haven ids.

| id | what it is | `=text` does |
|---|---|---|
| `p:cash_stack` | 3 banded bricks of green bills | band label (default `$10K`) |
| `p:banknote` | one flat green bill (best with `hero_fx: pile` = money rain) | corner number (default `100`) |
| `p:coin_pile` | towers of gold coins + spilled coins | — |
| `p:gold_coin` | one big gold coin standing on its edge (great with `spin`) | face symbol (default `$`) |
| `p:gold_bar` | trapezoid gold bullion bar | stamp (default `999.9`) |
| `p:money_bag` | tied sack with a big `$` | symbol/word on the sack |
| `p:credit_card` | blue card with chip, number, magnetic stripe on the back | bank name on the card |
| `p:phone` | phone with a banking app: balance + 3 transactions | balance — starts with `-` = red, else green (default `-$1,240`) |
| `p:calculator` | desk calculator, tilted screen | number on the screen (default `0.00`) |
| `p:atm` | full-size cash machine, bills sticking out of the slot | header word (default `ATM`) |
| `p:piggy_bank` | pink piggy bank seen from the side, coin slot on top | word on its side |
| `p:wallet` | leather wallet standing up, bills poking out | embossed word |
| `p:safe` | steel safe with round vault door + spoked wheel | plate above the door |
| `p:padlock` | gold padlock (locked money, frozen account, debt trap) | word on the lock |
| `p:price_tag` | yellow price tag with hole + string | price (default `$99`) |
| `p:receipt_long` | long receipt on the floor with a roll, TOTAL nearest the lens | `TOTAL $1,020` or `RENT $900\|FOOD $300\|TOTAL $1,200` (last = total) |
| `p:shopping_cart` | chrome wire shopping cart, red handle | — |
| `p:rent_sign` | red/white sign board on a wooden post | sign words (default `FOR RENT`) |
| `p:house_small` | small house: gable roof, door, lit windows, chimney | house number / word above the door |
| `p:bank_building` | classic bank: steps, 6 columns, pediment with gold `$` | name on the front (default `BANK`) |
| `p:bar_chart_3d` | 3D bar chart, last bar green (up) or red (down) | `2,4,9` = bar heights + labels; other text = base label |
