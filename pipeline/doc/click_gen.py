"""Source of pipeline/doc/click.json — the full Citibank video, hand-written in a compact form. Run: py pipeline/doc/click_gen.py"""
import json
from pathlib import Path


def e(v, on=None, **k):
    d = {"v": v, **k}
    if on:
        d["on"] = on
    return d


def L(say, *show, src=None, answers=None):
    d = {"say": say, "show": list(show)}
    if src:
        d["src"] = src
    if answers:
        d["answers"] = answers
    return d


def A(id, obj, t=None, **k):
    d = {"id": id, "obj": obj, **k}
    if t:
        d["t"] = t
    return d


def M(bg, layout, actors, *lines, mood=None):
    d = {"kind": "motion", "bg": bg, "layout": layout, "actors": actors, "lines": list(lines)}
    if mood:
        d["mood"] = mood
    return d


def K(kind, *lines, **k):
    return {"kind": kind, **k, "lines": list(lines)}


VAULT = "Cinematic 3D render of a huge round steel bank vault door standing open in a dark concrete room, one cold spotlight from above, dramatic shadows, 16:9, no text"
NYC = "Cinematic night photo of Manhattan office towers from above, a few windows lit, cold blue tones, haze, 16:9, no text"

scenes = [
    # ================= HOOK (type: trailer) =================
    M("desk", None, [A("bank", "bank", x=420, y=560, s=1.5, z=0.4), A("btn", "button", "SEND", x=960, y=640, s=1.0, z=0.6), A("cur", "cursor"),
                     A("p1", "person", x=1480, y=360, s=0.8, z=0.3), A("p2", "person", x=1640, y=560, s=0.9, z=0.5), A("p3", "person", x=1470, y=740, s=1.0, z=0.7)],
      L("One click sent nine hundred million dollars to the wrong people.",
        e("in", id="bank", **{"from": "left"}), e("in", id="btn", **{"from": "pop"}), e("in", id="cur", **{"from": "bottom"}),
        e("press", "click", id="cur", to="btn"),
        e("in", "sent", id="p1", **{"from": "right"}), e("in", "sent", id="p2", **{"from": "right"}), e("in", "sent", id="p3", **{"from": "right"}),
        e("fly", "nine", **{"from": "bank", "to": "p2"}, obj="bill", n=16), e("count", "nine", id="bank", n=900000000, prefix="$"),
        e("fly", "hundred", **{"from": "bank", "to": "p1"}, obj="bill", n=12), e("fly", "million", **{"from": "bank", "to": "p3"}, obj="bill", n=12),
        e("glow", "wrong", id="p2", color="red"), e("label", "wrong", id="p2", t="WRONG PEOPLE"), e("cam", "wrong", id="p2", zoom=1.35), src="S1"), mood="drive"),
    M("court", "trio", [A("d1", "document", "APPROVAL 1"), A("d2", "document", "APPROVAL 2"), A("d3", "document", "APPROVAL 3"), A("lk", "lock", x=960, y=520, s=1.5, z=0.85)],
      L("Three people approved it and nobody stopped it.",
        e("in", id="d1", **{"from": "drop"}), e("in", id="d2", **{"from": "drop"}), e("in", id="d3", **{"from": "drop"}),
        e("stamp", "Three", id="d1", t="APPROVED", color="green"), e("stamp", "people", id="d2", t="APPROVED", color="green"), e("stamp", "approved", id="d3", t="APPROVED", color="green"),
        e("in", "nobody", id="lk", **{"from": "pop"}), e("open", "stopped", id="lk"), e("cross", "stopped", id="lk"), src="S1")),
    K("receipt", L("It was supposed to be eight million and this is what left the bank.",
                   e("row", k="DATE", val="AUG 11 2020"), e("row", "supposed", k="EXPECTED", val="$7,800,000"), e("row", "eight", k="APPROVALS", val="3 OF 3"),
                   e("row", "this", k="SENT", val="$893,944,008", bold=True), e("circle", "left", row=4), src="S1"),
      img="nyc.jpg", prompt=NYC, head="CITIBANK N.A.\nOUTGOING WIRE TRANSFER", hud="AUGUST 11 2020 · 5:45 PM ET · NEW YORK", tag="RECONSTRUCTION"),
    K("drain", L("It was gone before anyone looked up.", e("stamp", "looked", t="GONE")), amount=893944008, head="CITIBANK · ITS OWN MONEY"),
    M("vault", "duel", [A("hk", "laptop", "ACCESS"), A("th", "person"), A("vt", "vault", x=960, y=520, s=1.1, z=0.3)],
      L("But nobody hacked the bank.", e("in", id="vt", **{"from": "pop"}), e("in", id="hk", **{"from": "left"}), e("cross", "hacked", id="hk")),
      L("And nobody stole a thing.", e("in", id="th", **{"from": "right"}), e("cross", "stole", id="th"), e("cam", "thing", id="vt", zoom=1.25))),
    K("headline", L("And here is the wildest part because the bank never got it back.", e("head", t="Citibank [can't get back $500 million] it wired by mistake, judge rules"), src="S2"),
      pub="CNN Business", date="FEBRUARY 16 2021"),
    M("court", "flow", [A("bank", "bank"), A("cash", "cashstack"), A("gv", "gavel")],
      L("A judge refused and called it one of the biggest blunders in banking history.",
        e("in", id="bank", **{"from": "left"}), e("in", id="cash", **{"from": "pop"}), e("in", id="gv", **{"from": "top"}),
        e("shake", "refused", id="gv"), e("stamp", "refused", id="bank", t="DENIED"), e("cam", "biggest", id="gv", zoom=1.3),
        e("label", "blunders", id="gv", t='"BIGGEST BLUNDERS"'), e("drain", "history", id="cash"), src="S1")),
    K("list", L("So who clicked and who kept the money and why did the law let them?", e("row", t="Who clicked"), e("row", "kept", t="Who kept the money"), e("row", "why", t="Why the law let them")), head="THIS FILE"),
    K("title", L("This is the nine hundred million dollar click.", e("title", "nine", t="The $900 Million Click"), e("stamp", "click", t="CASE FILE · AUG 11 2020"), src="S1"), img="vault.jpg", prompt=VAULT, head="THE MOST EXPENSIVE CLICK IN BANKING"),

    M("desk", "duel", [A("me", "person"), A("lp", "laptop", "PAYMENT"), A("cur", "cursor")],
      L("Imagine you work at a bank.", e("in", id="me", **{"from": "left"}), e("in", "bank", id="lp", **{"from": "right"}), e("in", "bank", id="cur", **{"from": "bottom"})),
      L("Your screen shows three small boxes. You tick one.", e("glow", "screen", id="lp", color="gold"), e("press", "tick", id="cur", to="lp")),
      L("Then you go home.", e("out", "home", id="me")),
      L("And by morning your employer is missing nine hundred million dollars.", e("shake", "missing", id="lp"), e("count", "nine", id="lp", n=893944008, prefix="-$", color="red"), e("glow", "million", id="lp", color="red"), src="S1")),

    # ================= 1. WHO CLICKED =================
    M("city", "flow", [A("rv", "building", x=420), A("bk", "bank", x=960), A("l1", "person", x=1480, y=420, s=0.9), A("l2", "person", x=1560, y=680, s=1.0)],
      L("It starts with a makeup company.", e("in", id="rv", **{"from": "left"}), e("label", "makeup", id="rv", t="REVLON")),
      L("In two thousand sixteen Revlon borrowed almost two billion dollars.", e("count", "borrowed", id="rv", n=1800000000, prefix="$"), e("glow", "billion", id="rv", color="gold"), src="S1"),
      L("The money came from hundreds of lenders.", e("in", "money", id="l1", **{"from": "right"}), e("in", "hundreds", id="l2", **{"from": "right"}),
        e("fly", "lenders", **{"from": "l1", "to": "rv"}, obj="bill", n=10)),
      L("And Citibank sat in the middle.", e("in", "Citibank", id="bk", **{"from": "drop"}), e("cam", "middle", id="bk", zoom=1.3)), mood="tense"),
    M("desk", "hero", [A("bk", "bank"), A("rv", "building"), A("ln", "person"), A("ev", "envelope")],
      L("Its job was boring.", e("in", id="bk", **{"from": "pop"}), e("in", "boring", id="rv", **{"from": "left"}), e("in", "boring", id="ln", **{"from": "right"})),
      L("Revlon pays the bank. The bank pays the lenders.", e("fly", "Revlon", **{"from": "rv", "to": "bk"}, obj="coin", n=8), e("fly", "lenders", **{"from": "bk", "to": "ln"}, obj="coin", n=8)),
      L("Citibank never risks a cent of its own money.", e("glow", "never", id="bk", color="green"), e("label", "cent", id="bk", t="JUST THE MIDDLEMAN"), src="S1"),
      L("Until August the eleventh.", e("shake", "August", id="bk"), e("glow", "eleventh", id="bk", color="red"))),
    K("clock", L("That day Revlon owed a small interest payment.", e("time", t="AUG 11"), e("sub", "interest", t="INTEREST DUE TODAY")),
      L("Seven point eight million dollars.", e("sub", "Seven", t="$7.8 MILLION · ROUTINE"), src="S1")),
    M("desk", "flow", [A("lp", "laptop", "FLEXCUBE", x=420, s=1.3), A("a", "person", x=980, s=1.0), A("b", "person", x=1300, s=1.0), A("c", "person", x=1620, s=1.0)],
      L("The payment was built in a banking program called Flexcube.", e("in", id="lp", **{"from": "left"}), e("label", "Flexcube", id="lp", t="FLEXCUBE"), src="S1"),
      L("And at Citibank a big payment needs three people.", e("in", "big", id="a", **{"from": "drop"}), e("in", "needs", id="b", **{"from": "drop"}), e("in", "three", id="c", **{"from": "drop"})),
      L("One builds it. One checks it. One approves it.", e("glow", "builds", id="a", color="gold"), e("glow", "checks", id="b", color="gold"), e("glow", "approves", id="c", color="gold"),
        e("fly", "approves", **{"from": "a", "to": "c"}, obj="doc", n=5)),
      L("They call it the six eyes rule.", e("cam", "six", id="b", zoom=1.3), e("label", "eyes", id="b", t="SIX EYES"), src="S1")),
    M("vault", "flow", [A("lp", "laptop", "FLEXCUBE"), A("ln", "document", "WHOLE LOAN"), A("ws", "briefcase")],
      L("But Flexcube was old and strange.", e("in", id="lp", **{"from": "left"}), e("shake", "strange", id="lp")),
      L("To send a small payment it first pretended to pay off the whole loan.", e("in", "pretended", id="ln", **{"from": "pop"}), e("fly", "whole", **{"from": "lp", "to": "ln"}, obj="bill", n=10), src="S1"),
      L("Then it parked the big part in an inside account that goes nowhere.", e("in", "parked", id="ws", **{"from": "right"}), e("fly", "inside", **{"from": "ln", "to": "ws"}, obj="bill", n=10), e("label", "nowhere", id="ws", t="WASH ACCOUNT"), src="S1"),
      L("So the money never really leaves. If you tick the right boxes.", e("glow", "never", id="ws", color="green"), e("cam", "boxes", id="lp", zoom=1.3))),
    M("vault", "trio", [A("b1", "document", "FRONT"), A("b2", "document", "FUND"), A("b3", "document", "PRINCIPAL")],
      L("And that was the trap.", e("in", id="b1", **{"from": "drop"}), e("in", id="b2", **{"from": "drop"}), e("in", "trap", id="b3", **{"from": "drop"})),
      L("Sending only the interest meant ticking three boxes.", e("glow", "ticking", id="b1", color="gold"), e("glow", "three", id="b2", color="gold"), e("glow", "boxes", id="b3", color="gold"), src="S1"),
      L("They ticked one.", e("stamp", "ticked", id="b3", t="TICKED", color="green"), e("cross", "one", id="b1"), e("cross", "one", id="b2"), src="S1")),
    K("image", L("A contractor in India built the payment.", e("label", "India", t="BUILT IN INDIA", pos="tl"), src="S1"),
      L("His colleague checked it.", e("label", "checked", t="CHECKED", pos="l")),
      L("And a senior manager in Delaware approved it.", e("label", "Delaware", t="APPROVED IN DELAWARE", pos="br"), src="S1"),
      L("So who clicked? All three of them did.", e("big", "All", t="ALL THREE", label="SIX EYES · ZERO CATCHES"), answers=1),
      img="nyc.jpg", move="pull"),
    M("vault", "hero", [A("vt", "vault"), A("c1", "cashstack"), A("c2", "cashstack"), A("bk", "bank"), A("ln", "person")],
      L("At five forty five the vault opened.", e("in", id="vt", **{"from": "pop"}), e("in", id="c1", **{"from": "pop"}), e("in", id="c2", **{"from": "pop"}), e("open", "vault", id="vt"), src="S1"),
      L("Not seven point eight million. Almost nine hundred million.", e("count", "Almost", id="vt", n=893944008, prefix="$", color="red"), e("drain", "nine", id="c1"), e("drain", "hundred", id="c2"), src="S1"),
      L("Every dollar of the loan plus the interest.", e("in", "Every", id="ln", **{"from": "right"}), e("fly", "dollar", **{"from": "vt", "to": "ln"}, obj="bill", n=16)),
      L("And it was not Revlon's money. It was Citibank's own.", e("in", "Revlon's", id="bk", **{"from": "left"}), e("glow", "Citibank's", id="bk", color="red"), e("label", "own", id="bk", t="ITS OWN MONEY"), src="S1")),
    M("city", "duel", [A("ck", "clock"), A("bd", "building")],
      L("Then everyone went home.", e("in", id="bd", **{"from": "right"}), e("in", "home", id="ck", **{"from": "pop"})),
      L("And the mistake sat there all night.", e("shake", "mistake", id="ck"), e("cam", "night", id="ck", zoom=1.3), e("glow", "night", id="ck", color="red")), mood="mystery"),
    M("desk", "duel", [A("lp", "laptop", "BALANCE CHECK"), A("mg", "person"), A("ph", "phone", "ERROR", x=960, y=700, s=0.8, z=0.8)],
      L("The next morning a manager ran a routine check.", e("in", id="mg", **{"from": "right"}), e("in", "routine", id="lp", **{"from": "left"}), src="S1"),
      L("The numbers did not match.", e("shake", "not", id="lp"), e("glow", "match", id="lp", color="red")),
      L("Almost nine hundred million dollars was missing.", e("count", "nine", id="lp", n=893944008, prefix="-$", color="red"), e("in", "missing", id="ph", **{"from": "pop"}), e("shake", "missing", id="ph"), src="S1"), mood="react"),
    K("card", L("This is what should have gone out.", e("bar", label="MEANT TO SEND", val="$7.8M", w=0.03), src="S1"),
      L("And this is what did.", e("bar", "this", label="ACTUALLY SENT", val="$893.9M", w=1, color="red"), e("stamp", "did", t="114× too much"), src="S1"),
      head="CITIBANK · AUGUST 11 2020", source="SOURCE: U.S. DISTRICT COURT, S.D.N.Y."),

    # ================= 2. WHO KEPT THE MONEY =================
    M("city", "hero", [A("bk", "bank"), A("p1", "person"), A("p2", "person"), A("p3", "person"), A("p4", "person")],
      L("So Citibank did the only thing it could.", e("in", id="bk", **{"from": "pop"}), e("in", "only", id="p1", **{"from": "left"}), e("in", "only", id="p2", **{"from": "right"}),
        e("in", "thing", id="p3", **{"from": "left"}), e("in", "thing", id="p4", **{"from": "right"})),
      L("It asked for the money back.", e("fly", "asked", **{"from": "bk", "to": "p1"}, obj="doc", n=4), e("fly", "money", **{"from": "bk", "to": "p2"}, obj="doc", n=4), e("fly", "back", **{"from": "bk", "to": "p4"}, obj="doc", n=4), src="S3"),
      L("And most lenders said sure.", e("fly", "most", **{"from": "p1", "to": "bk"}, obj="bill", n=10), e("fly", "sure", **{"from": "p3", "to": "bk"}, obj="bill", n=10)),
      L("About three hundred eighty five million dollars came home.", e("count", "three", id="bk", n=385000000, prefix="$", color="ink"), e("glow", "home", id="bk", color="green"), src="S3"), mood="tense"),
    M("city", "duel", [A("rv", "building"), A("cs", "cashstack")],
      L("Now remember Revlon.", e("in", id="rv", **{"from": "left"}), e("label", "Revlon", id="rv", t="REVLON · 2020")),
      L("That year its stores were shut by the pandemic.", e("shake", "shut", id="rv"), e("glow", "pandemic", id="rv", color="red")),
      L("So for a lender getting every dollar back early felt like a miracle.", e("in", "every", id="cs", **{"from": "pop"}), e("grow", "dollar", id="cs"), e("glow", "miracle", id="cs", color="gold")),
      L("And miracles are hard to give back.", e("cam", "hard", id="cs", zoom=1.3))),
    M("court", "crowd", [A("f1", "person"), A("f2", "person"), A("f3", "person"), A("f4", "person"), A("bc", "briefcase", x=960, y=720, s=1.3, z=0.85)],
      L("But ten investment firms looked at the money.", e("in", id="f1", **{"from": "drop"}), e("in", id="f2", **{"from": "drop"}), e("in", "ten", id="f3", **{"from": "drop"}), e("in", "firms", id="f4", **{"from": "drop"}),
        e("in", "money", id="bc", **{"from": "pop"}), src="S3"),
      L("And they said no.", e("stamp", "no", id="f2", t="NO"), e("stamp", "no", id="f3", t="NO"), e("shake", "no", id="bc")),
      L("Together they were holding half a billion dollars.", e("cam", "holding", id="bc", zoom=1.35), e("count", "half", id="bc", n=504000000, prefix="$", color="red"), e("glow", "billion", id="bc", color="gold"), src="S2", answers=2)),
    M("desk", "duel", [A("ph", "phone", "GROUP CHAT"), A("tr", "person")],
      L("Inside those firms the group chats lit up.", e("in", id="tr", **{"from": "right"}), e("in", "chats", id="ph", **{"from": "pop"}), e("shake", "lit", id="ph"), e("glow", "lit", id="ph", color="gold")),
      L("Traders typed words like unbelievable and accidental and overpayment.", e("label", "unbelievable", id="ph", t='"UNBELIEVABLE"'), e("label", "accidental", id="ph", t='"ACCIDENTAL"'), e("shake", "overpayment", id="ph"), src="S2"),
      L("So they knew something was off.", e("cam", "knew", id="tr", zoom=1.3), e("glow", "off", id="tr", color="red"))),
    M("city", "flow", [A("ln", "document", "LOAN · DUE 2023"), A("rv", "building"), A("ck", "clock")],
      L("But here is the part that made this case famous.", e("in", id="rv", **{"from": "left"}), e("in", "part", id="ln", **{"from": "pop"})),
      L("Revlon really did owe them that money.", e("stamp", "owe", id="ln", t="OWED", color="green"), e("glow", "money", id="ln", color="gold"), src="S3"),
      L("Every dollar. To the cent.", e("count", "dollar", id="ln", n=504000000, prefix="$"), e("cam", "cent", id="ln", zoom=1.25)),
      L("The loan just was not due for three more years.", e("in", "due", id="ck", **{"from": "right"}), e("shake", "three", id="ck"), e("label", "years", id="ck", t="3 YEARS EARLY"), src="S3")),
    M("desk", "duel", [A("you", "person"), A("bc", "briefcase"), A("ph", "phone", "+$504M", x=960, y=700, s=0.8, z=0.85)],
      L("Now put yourself in their chair.", e("in", id="you", **{"from": "left"}), e("cam", "chair", id="you", zoom=1.2)),
      L("Half a billion dollars just landed in your account.", e("in", "landed", id="ph", **{"from": "drop"}), e("shake", "landed", id="ph"), e("in", "account", id="bc", **{"from": "right"}), e("grow", "account", id="bc"), src="S2"),
      L("It is money you were owed anyway.", e("glow", "owed", id="bc", color="gold")),
      L("Would you send it back?", e("cam", "send", id="you", zoom=1.4), e("glow", "back", id="you", color="red"))),
    K("image", L("So it was not a robbery.", e("deny", t="NO ROBBERY", sub="mask")),
      L("And it was not a trick.", e("deny", t="NO TRICK", sub="key")),
      L("It was their own loan paid back early by accident.", e("big", "own", t="PAID BACK EARLY", label="BY ACCIDENT · BY THE WRONG PAYER")),
      img="vault.jpg", move="push"),

    # ================= 3. WHY THE LAW LET THEM =================
    M("court", "flow", [A("cs", "document", "1991 RULING"), A("gv", "gavel"), A("ev", "envelope")],
      L("And New York has an old rule for exactly this.", e("in", id="gv", **{"from": "top"}), e("in", "old", id="cs", **{"from": "left"}), src="S2"),
      L("It comes from a case in nineteen ninety one.", e("glow", "nineteen", id="cs", color="gold"), e("cam", "ninety", id="cs", zoom=1.25)),
      L("If someone pays off a real debt by mistake you can keep the money.", e("in", "pays", id="ev", **{"from": "right"}), e("fly", "debt", **{"from": "ev", "to": "cs"}, obj="bill", n=8), e("stamp", "keep", id="cs", t="KEEP IT", color="green"), src="S2"),
      L("But only if you did not know it was a mistake.", e("shake", "only", id="gv"), e("label", "know", id="gv", t="DID THEY KNOW?")), mood="mystery"),
    M("court", "duel", [A("bk", "bank"), A("ln", "person"), A("gv", "gavel", x=960, y=640, s=1.0, z=0.8)],
      L("So the whole trial came down to one question.", e("in", id="bk", **{"from": "left"}), e("in", id="ln", **{"from": "right"}), e("in", "question", id="gv", **{"from": "top"})),
      L("Did the lenders know?", e("cam", "lenders", id="ln", zoom=1.3), e("glow", "know", id="ln", color="red")),
      L("Citibank said of course they knew because nobody repays a loan three years early.", e("cam", "Citibank", id="bk", zoom=1.3), e("glow", "course", id="bk", color="gold"), e("shake", "nobody", id="bk")),
      L("The lenders said a bank that size does not make a mistake that big.", e("cam", "lenders", id="ln", zoom=1.3), e("glow", "size", id="ln", color="gold"), e("shake", "big", id="ln"))),
    M("court", "hero", [A("gv", "gavel"), A("bk", "bank"), A("ln", "person"), A("cs", "cashstack")],
      L("In February two thousand twenty one the judge picked a side.", e("in", id="gv", **{"from": "top"}), e("in", "judge", id="bk", **{"from": "left"}), e("in", "judge", id="ln", **{"from": "right"}), e("in", "side", id="cs", **{"from": "pop"}), src="S2"),
      L("The lenders could keep all of it.", e("shake", "keep", id="gv"), e("fly", "keep", **{"from": "bk", "to": "ln"}, obj="bill", n=14), e("stamp", "all", id="bk", t="DENIED"), src="S2", answers=3),
      L("Half a billion dollars. Gone for good.", e("drain", "Half", id="cs"), e("count", "billion", id="ln", n=504000000, prefix="$", color="red"), src="S2"), mood="react"),
    K("quote", L("And the judge did not spare the bank.", e("quote", "spare", t="one of the biggest blunders in banking history"), src="S1"), by="U.S. DISTRICT JUDGE JESSE FURMAN · FEBRUARY 16 2021"),
    K("stats", L("Then it got worse because the regulators arrived.", e("stat", "regulators", n=400, prefix="$", suffix="M", label="FINE · WEAK INTERNAL CONTROLS · OCT 7 2020", color="red"), src="S4"),
      L("That fine covered years of problems and not just one click.", e("stat", "years", t="2013 · 2015 · 2020", label="WARNINGS THE BANK HAD ALREADY BEEN GIVEN"), src="S4"),
      head="CITIBANK · THE BILL KEEPS GROWING", side="globe"),

    # ================= THE TWIST =================
    M("vault", "flow", [A("vt", "vault"), A("lk", "lock"), A("ck", "clock")],
      L("But Citibank was not done.", e("in", id="vt", **{"from": "pop"}), e("in", "done", id="lk", **{"from": "drop"})),
      L("It appealed.", e("shake", "appealed", id="lk")),
      L("And for nineteen months half a billion dollars sat frozen.", e("in", "nineteen", id="ck", **{"from": "right"}), e("count", "half", id="vt", n=504000000, prefix="$"), e("glow", "frozen", id="vt", color="gold"), e("cam", "frozen", id="vt", zoom=1.25), src="S3"), mood="tense"),
    M("court", "trio", [A("j1", "person"), A("j2", "person"), A("j3", "person"), A("dc", "document", "THE RULING", x=960, y=760, s=0.9, z=0.85)],
      L("Then in September two thousand twenty two three new judges read the same facts.", e("in", id="j1", **{"from": "drop"}), e("in", "three", id="j2", **{"from": "drop"}), e("in", "judges", id="j3", **{"from": "drop"}), e("in", "facts", id="dc", **{"from": "pop"}), src="S3"),
      L("And they saw the opposite.", e("stamp", "opposite", id="dc", t="REVERSED"), e("shake", "opposite", id="dc"), src="S3"),
      L("The loan was not due for three years. So nobody was owed that money yet.", e("glow", "due", id="j2", color="gold"), e("cross", "owed", id="dc"), src="S3")),
    M("desk", "duel", [A("ph", "phone", "CALL THE BANK"), A("iv", "person")],
      L("And a careful investor would have picked up the phone.", e("in", id="iv", **{"from": "right"}), e("in", "careful", id="ph", **{"from": "pop"}), e("shake", "phone", id="ph"), src="S3"),
      L("One call. Is this a mistake?", e("glow", "call", id="ph", color="gold"), e("cam", "mistake", id="ph", zoom=1.35)),
      L("Nobody made that call.", e("cross", "Nobody", id="ph"))),
    M("city", "hero", [A("bk", "bank"), A("f1", "person"), A("f2", "person"), A("f3", "person"), A("f4", "person")],
      L("So the ten firms had to send it all back.", e("in", id="bk", **{"from": "pop"}), e("in", id="f1", **{"from": "left"}), e("in", id="f2", **{"from": "right"}), e("in", "firms", id="f3", **{"from": "left"}), e("in", "firms", id="f4", **{"from": "right"}),
        e("fly", "send", **{"from": "f1", "to": "bk"}, obj="bill", n=10), e("fly", "all", **{"from": "f2", "to": "bk"}, obj="bill", n=10), e("fly", "back", **{"from": "f4", "to": "bk"}, obj="bill", n=10), src="S3"),
      L("By December the case was closed.", e("count", "December", id="bk", n=504000000, prefix="+$"), e("stamp", "closed", id="bk", t="CASE CLOSED", color="green"), src="S5"), mood="drive"),

    # ================= ENDING =================
    M("desk", "trio", [A("e1", "person"), A("e2", "person"), A("e3", "person"), A("lp", "laptop", "ONE SCREEN", x=960, y=760, s=0.9, z=0.85)],
      L("Think about that for a second.", e("in", id="e1", **{"from": "drop"}), e("in", id="e2", **{"from": "drop"}), e("in", id="e3", **{"from": "drop"})),
      L("Six eyes looked at one screen.", e("in", "one", id="lp", **{"from": "pop"}), e("glow", "screen", id="lp", color="gold")),
      L("And the most expensive mistake in banking walked right past them.", e("shake", "mistake", id="lp"), e("cross", "past", id="lp"), src="S1"),
      L("Because each of them thought someone else had checked.", e("glow", "each", id="e1", color="red"), e("glow", "someone", id="e2", color="red"), e("glow", "checked", id="e3", color="red"))),
    M("desk", "flow", [A("ck", "clock"), A("gv", "gavel"), A("cs", "cashstack")],
      L("So Citibank got its money back.", e("in", id="cs", **{"from": "pop"}), e("grow", "money", id="cs")),
      L("It only took two years and two courts.", e("in", "two", id="ck", **{"from": "left"}), e("in", "courts", id="gv", **{"from": "top"}), e("shake", "courts", id="gv")),
      L("And a place in history it never wanted.", e("cam", "history", id="gv", zoom=1.25), e("label", "never", id="gv", t='"BIGGEST BLUNDERS"'))),
    M("vault", "trio", [A("b1", "document", "FRONT"), A("b2", "document", "FUND"), A("b3", "document", "PRINCIPAL"), A("cur", "cursor")],
      L("All of it because of three little boxes.", e("in", id="b1", **{"from": "drop"}), e("in", id="b2", **{"from": "drop"}), e("in", "three", id="b3", **{"from": "drop"}), e("in", "boxes", id="cur", **{"from": "bottom"})),
      L("And one click that nobody questioned.", e("press", "click", id="cur", to="b3"), e("stamp", "click", id="b3", t="TICKED", color="green"), e("cross", "nobody", id="b1"), e("cross", "questioned", id="b2"))),
    M("city", "duel", [A("bk", "bank"), A("you", "person"), A("ph", "phone", "+$9,000", x=960, y=700, s=0.8, z=0.85)],
      L("And here is the part that matters for you.", e("in", id="bk", **{"from": "left"}), e("in", "you", id="you", **{"from": "right"}), e("cam", "you", id="you", zoom=1.25)),
      L("If a bank ever drops money into your account by mistake it is not yours.", e("fly", "drops", **{"from": "bk", "to": "you"}, obj="bill", n=12), e("in", "account", id="ph", **{"from": "pop"}), e("cross", "not", id="ph"), src="S3"),
      L("Even nine hundred million dollars had to go back.", e("fly", "nine", **{"from": "you", "to": "bk"}, obj="bill", n=14), e("count", "back", id="bk", n=900000000, prefix="$"), src="S3"),
      L("So before you click anything check the boxes.", e("glow", "check", id="you", color="gold"), e("shake", "boxes", id="ph")), mood="drive"),
]

spec = {
    "id": "click",
    "title": "How Citibank Lost $900,000,000 With One Click",
    "alt_titles": ["How One Wrong Click Cost Citibank $900,000,000", "Why Citibank Could Not Get $500,000,000 Back"],
    "tempo": 1.0,
    "hook": {"type": "trailer"},
    "topic": {"owner_pick": "owner, 16 Nov 2026: 'Complete that video. I like the topic.'", "evergreen": True},
    "thumb": {"words": "SENT BY MISTAKE", "space": "right", "copied_from": "how really? — 'Why $2 Trillion vanishes every year' (one object, 2-3 words, empty space)",
              "prompt": "Cinematic 3D render, extreme close-up of one glowing red keyboard key labelled with a white arrow being pressed by a single index finger, placed on the left third of the frame, a few hundred-dollar bills blowing away from the key toward the right, pitch-dark background, one hard warm spotlight from above, shallow depth of field, the right half of the frame empty and dark, no people's faces, no text, 16:9"},
    "sources": [
        {"id": "S1", "short": "In re Citibank August 11, 2020 Wire Transfers, S.D.N.Y. (Judge Furman), Feb 16 2021", "url": "https://www.insurancejournal.com/app/uploads/2021/02/citibank-revlon-ruling.pdf", "fact": "Aug 11 2020: Citibank, administrative agent on Revlon's 2016 term loan, meant to wire about $7.8M of interest and wired about $893.9M of its own funds; Flexcube; maker-checker-approver 'six eyes' (Wipro contractor in India, a colleague, a senior Citibank manager in Delaware); only the PRINCIPAL box was ticked instead of FRONT, FUND and PRINCIPAL; found the next morning; 'one of the biggest blunders in banking history'."},
        {"id": "S2", "short": "Bloomberg / Banking Dive, Feb 16 2021", "url": "https://www.bankingdive.com/news/citi-revlon-lawsuit-payment-mistake-creditors/595154/", "fact": "Judge Furman: ten asset managers (Brigade, HPS, Symphony…) may keep $504M under New York's discharge-for-value rule (Banque Worms, 1991); chats at the firms used the words 'unbelievable', 'erroneous', 'accidental', 'overpayment'."},
        {"id": "S3", "short": "Second Circuit, Sept 8 2022 (Loeb & Loeb summary)", "url": "https://www.loeb.com/en/insights/publications/2022/10/second-circuit-reverses-ruling-500-million-wire-transfer-paying-off-revlon-loan-returned", "fact": "About $385M was returned on request; ten managers for 126 debtholders kept about $500M; appeals court reversed: the loan was not due for three years so they were not entitled to it, and a prudent investor would have called Citibank to ask."},
        {"id": "S4", "short": "OCC news release 2020-132, Oct 7 2020", "url": "https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-132.html", "fact": "$400M civil money penalty against Citibank for deficiencies in risk management, data governance and internal controls; the Fed cited issues raised in 2013 and 2015."},
        {"id": "S5", "short": "Bloomberg, Dec 19 2022", "url": "https://www.bloomberg.com/news/articles/2022-12-19/citigroup-saga-of-900-million-error-gets-legal-ring-of-finality", "fact": "The case ended with a dismissal after the money was returned."},
    ],
    "scenes": scenes,
}
Path(__file__).with_name("click.json").write_text(json.dumps(spec, indent=1, ensure_ascii=False), encoding="utf8")
print("wrote click.json", len(scenes), "scenes")
