import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VIDEOS = ROOT.parent / "videos"

SEO = {
    "ep01": {
        "title": "How Banks Create Money Out of Nothing (And It's Legal)",
        "alts": ["Your Bank Loan Didn't Exist 5 Seconds Ago", "Banks Don't Lend Your Savings. They Do THIS Instead"],
        "line1": "How do banks create money? When you take a loan, the bank doesn't hand you anyone's savings. It types a number, and new money appears.",
        "summary": "Dave needs $10,000 for a car. Where does that money actually come from? Using a duck, a vault and a very smug banker, we explain how banks create money, why it vanishes when you pay it back, what stops banks from printing infinite cash, and what happened when Silicon Valley Bank ran out.",
        "learn": ["Where the money in your bank account really comes from", "Why 9 out of 10 dollars are just numbers on a screen", "The 3 brakes that stop banks from creating infinite money", "Why repaying a loan makes money disappear", "What a bank run is (and how the FDIC protects you)"],
        "tags": ["how banks create money", "how do banks make money", "money creation explained", "where does money come from", "how bank loans work", "fractional reserve banking", "bank run explained", "silicon valley bank collapse", "federal reserve explained", "economics for beginners", "dave explains money"],
        "hashtags": ["#banking", "#money", "#economics"],
        "pinned": "Before this video, where did you think bank loans came from? Be honest 👇 (Most people say 'other people's savings'.)",
        "thumb": "C (ONE CLICK.) or B (NOT YOUR SAVINGS) — both avoid repeating the title's words.",
        "next": "Your Credit Card Makes Money Off You, Even If You Pay in Full",
    },
    "ep02": {
        "title": "How Credit Cards Make Money Even If You Pay in Full",
        "alts": ["You're Paying for Someone's Cashback (Even With Cash)", "The 22% Trap: How Credit Card Companies Really Profit"],
        "line1": "How do credit card companies make money if you pay your bill in full? Hidden swipe fees, the rewards trick, and the 22% interest trap, explained simply.",
        "summary": "Dave pays his card on time every month and never pays interest. The bank still profits from him, and you might be paying for his cashback. We follow one $5 coffee through a raccoon's toll booth to show where your money really goes, and how to use cards without getting bitten.",
        "learn": ["The invisible 2% fee hidden in almost every price", "Who actually pays for credit card rewards", "Why a $5,000 balance can take 11+ years to pay off", "The sneaky fees card companies love", "5 habits to use a credit card without getting burned"],
        "tags": ["how credit cards make money", "credit card interest explained", "credit card swipe fees", "interchange fees explained", "credit card rewards", "cashback explained", "minimum payment trap", "credit card debt", "how to use a credit card", "personal finance for beginners", "dave explains money"],
        "hashtags": ["#creditcards", "#personalfinance", "#money"],
        "pinned": "Do you pay your credit card in full every month? Reply YES or NO 👇 (No judgment, the raccoon is watching both of us.)",
        "thumb": "A (THE HIDDEN FEE) — pairs well; B (PAID ON TIME?) repeats less of the title than C.",
        "next": "Why a $300,000 House Costs You $720,000",
    },
    "ep03": {
        "title": "Why a $300,000 House Costs You $720,000",
        "alts": ["Your First Mortgage Payment Is 88% Interest (Here's Why)", "How Mortgages REALLY Work (Explained With Pizza)"],
        "line1": "How do mortgages work? Borrow $300,000 at 7% for 30 years and you'll pay the bank about $720,000. Here's why, and how to save $100,000+.",
        "summary": "Dave finally buys a house. Then he learns the real price. We explain mortgage interest, why your first payments barely touch the loan, the costs nobody mentions, who really owns your mortgage, whether renting is better, and the simple habit that can save over $100,000.",
        "learn": ["How mortgage interest actually works (the pizza explanation)", "Why your first payment is mostly interest", "The hidden costs of owning a home", "Who really owns your mortgage", "Rent vs buy: how to think about it", "How extra payments can save $100,000+"],
        "tags": ["how mortgages work", "mortgage explained", "mortgage interest explained", "amortization explained", "first time home buyer", "30 year vs 15 year mortgage", "extra mortgage payments", "rent vs buy", "closing costs explained", "real estate for beginners", "dave explains money"],
        "hashtags": ["#mortgage", "#realestate", "#personalfinance"],
        "pinned": "Would you rather rent or buy right now? 👇 Tell us your city and we'll read every answer.",
        "thumb": "B (THE BANK EATS FIRST) or C (WHERE YOUR $2,002 GOES) — A repeats the $720,000.",
        "next": "How McDonald's Really Makes Money (It's Not Burgers)",
    },
    "ep04": {
        "title": "How McDonald's Really Makes Money (It's Not Burgers)",
        "alts": ["McDonald's Is Secretly a Real Estate Company", "Why McDonald's Earns 10x More From Restaurants It Doesn't Run"],
        "line1": "How does McDonald's make money? Not mainly from burgers. It earns ~10x more from restaurants other people run, because it's secretly a landlord.",
        "summary": "McDonald's sells billions of burgers, but its real genius is rent. We tell the story of the McDonald brothers, Ray Kroc and Harry Sonneborn, open McDonald's actual annual report, and explain the franchise and real estate machine behind the Golden Arches, plus the big business lesson hiding inside.",
        "learn": ["The story of Ray Kroc and the genius real estate idea", "How McDonald's franchises actually work", "What McDonald's 2025 annual report really shows", "Why being a landlord is so profitable", "The one question to ask about any business"],
        "tags": ["how mcdonalds makes money", "mcdonalds business model", "mcdonalds real estate", "ray kroc", "harry sonneborn", "how franchises work", "franchise business model", "how companies make money", "business explained", "the founder", "dave explains money"],
        "hashtags": ["#mcdonalds", "#business", "#realestate"],
        "pinned": "Name another company whose REAL business is secretly something else 👇 Best answer might become a video.",
        "thumb": "B (NOT BURGERS.) repeats the title's kicker — use A (SECRET LANDLORD) or C (10×?!).",
        "next": "Where Your Tax Money Actually Goes (Most People Guess Wrong)",
    },
    "ep05": {
        "title": "Where Your Tax Money Actually Goes (Most People Guess Wrong)",
        "alts": ["America Now Spends More on Interest Than Its Military", "Your Taxes, Explained With One Pizza"],
        "line1": "Where do your taxes go? The US spent $7 trillion in 2025, and it now pays more in interest than on its entire military. Here's the whole budget, simply.",
        "summary": "A big chunk of Dave's paycheck disappears before it arrives. So where does it go? We turn the entire federal budget into one pizza, bust the biggest foreign aid myth, reveal who really pays the most income tax, and look back at the time the top tax rate was 94%.",
        "learn": ["What really comes out of your paycheck", "Where the US government's $7 trillion goes (per $100)", "Why interest now costs more than the military", "The foreign aid myth (26% vs 1%)", "Who pays the most income tax", "A short, wild history of US taxes"],
        "tags": ["where do taxes go", "federal budget explained", "how taxes work", "us government spending", "national debt interest", "social security explained", "foreign aid myth", "who pays the most taxes", "payroll tax explained", "economics for beginners", "dave explains money"],
        "hashtags": ["#taxes", "#economics", "#money"],
        "pinned": "Before watching, what % of the budget did YOU think went to foreign aid? 👇",
        "thumb": "A (INTEREST > ?!) pairs best with this title; use C for the foreign-aid angle.",
        "next": "Who Does America Owe $40 Trillion To? (It's Not China)",
    },
    "ep06": {
        "title": "Who Does America Owe $40 Trillion To? (It's Not China)",
        "alts": ["China Owns Less Than 2% of US Debt. So Who Owns the Rest?", "The US Debt, Explained So Simply It's Scary"],
        "line1": "Who owns the US national debt? America owes $40 trillion, but China holds less than 2%. The biggest lender is much closer to home.",
        "summary": "America's debt just passed $40 trillion, about $117,000 per person. Most people think China owns it. We follow the money to the real lenders, explain why the whole world still wants US bonds, the debt ceiling fights, how fast the debt grows every second, and why the government can't just print its way out.",
        "learn": ["What the national debt actually is", "How much China, Japan and the UK really hold", "Why most of the debt is owed to Americans", "How fast the debt grows (per second!)", "What the debt ceiling is and why it keeps coming back", "Why printing money doesn't solve it"],
        "tags": ["who owns us debt", "national debt explained", "us debt 40 trillion", "does china own us debt", "treasury bonds explained", "debt ceiling explained", "federal reserve", "social security trust fund", "can the us print money", "economics for beginners", "dave explains money"],
        "hashtags": ["#nationaldebt", "#economics", "#money"],
        "pinned": "Did you also think China owned most of America's debt? 👇 Reply with the number you guessed.",
        "thumb": "B (WHO GETS PAID?) or C ($40 TRILLION) — A repeats 'not China'.",
        "next": "Why Your $100 Buys Half of What It Did (Inflation Explained)",
    },
    "ep07": {
        "title": "Why Your $100 Buys Half of What It Did (Inflation Explained)",
        "alts": ["Inflation Is a Hidden Tax. Here's Who Pays It", "Where Did Half Your Money Go? Inflation, Simply Explained"],
        "line1": "Inflation explained simply: a $100 bill from 2000 buys about half as much today. Where did the other half go, and who secretly wins from it?",
        "summary": "Dave finds a $100 bill in an old jacket. Nobody touched it, yet it lost half its value. We explain inflation with ducks and bread: why prices rise, the 2022 spike, who wins and who loses, shrinkflation, the craziest hyperinflations in history, and how people try to protect their money.",
        "learn": ["What inflation really is (and how it's measured)", "The 3 reasons prices go up", "What caused the 9.1% inflation of 2022", "Who wins and who loses from inflation", "Shrinkflation: same price, less stuff", "Germany 1923 and Zimbabwe's $100 trillion bill"],
        "tags": ["inflation explained", "what is inflation", "why prices go up", "purchasing power", "shrinkflation", "hyperinflation", "inflation 2022", "who benefits from inflation", "federal reserve interest rates", "economics for beginners", "dave explains money"],
        "hashtags": ["#inflation", "#economics", "#personalfinance"],
        "pinned": "What's the price increase that shocked you the most lately? 🛒👇",
        "thumb": "B (SAME PRICE?!) or C ($1 in 1913 = $33) — A repeats '$100'.",
        "next": "Why Is Gold So Expensive? (It's Just a Yellow Rock)",
    },
    "ep08": {
        "title": "Why Is Gold So Expensive? (It's Just a Yellow Rock)",
        "alts": ["All the Gold Ever Mined Fits in One Cube (Worth $30 Trillion)", "Why Central Banks Are Suddenly Buying Gold Like Crazy"],
        "line1": "Why is gold so valuable? All the gold ever mined fits in a 22-meter cube worth ~$30 trillion, and central banks are buying it like crazy.",
        "summary": "You can't eat it, drive it, or live in it. So why does a yellow rock cost more than a car? We explain gold's superpowers, 5,000 years of gold money, the Nixon shock of 1971, the gold cube, what moves the gold price, why central banks are rushing in, where gold comes from, and whether it's actually a good investment.",
        "learn": ["Why gold became the world's oldest money", "The day the dollar stopped being backed by gold", "How much gold exists (the 22-meter cube)", "What makes the gold price go up and down", "Why central banks are buying record amounts", "Is gold a good investment? Both sides"],
        "tags": ["why is gold expensive", "why is gold valuable", "gold price explained", "gold investment", "central banks buying gold", "gold standard explained", "nixon shock 1971", "how much gold exists", "gold vs stocks", "economics for beginners", "dave explains money"],
        "hashtags": ["#gold", "#investing", "#economics"],
        "pinned": "Would you rather own $10,000 in gold or $10,000 in stocks for the next 10 years? 👇",
        "thumb": "B (ALL GOLD EVER = $30T) or C ($35 → $4,300) — A repeats 'rock'.",
        "next": "How the Stock Market Actually Works (Explained With Lemonade)",
    },
    "ep09": {
        "title": "How the Stock Market Actually Works (Explained With Lemonade)",
        "alts": ["Why Companies Losing Money Are Worth Billions", "The $1 Million Bet That Beat Wall Street Pros"],
        "line1": "How does the stock market work? What a stock really is, why prices move on news that hasn't happened yet, and the $1M bet that beat hedge funds.",
        "summary": "Dave turns his lemonade stand into a company and sells shares. Through that one stand, we explain stocks, IPOs, why prices follow expectations, how a money-losing company can be worth billions, dividends, crashes, bulls and bears, dollar-cost averaging, and Warren Buffett's famous million-dollar bet.",
        "learn": ["What a stock actually is", "Why stock prices move (expectations!)", "How a company can lose money and be worth billions", "How shareholders get paid", "Crashes, bulls, bears and your brain", "Buffett's $1M bet: index funds vs hedge funds"],
        "tags": ["how the stock market works", "stock market for beginners", "what is a stock", "how stock prices move", "index funds explained", "warren buffett bet", "dollar cost averaging", "bull vs bear market", "dividends explained", "investing for beginners", "dave explains money"],
        "hashtags": ["#stockmarket", "#investing", "#personalfinance"],
        "pinned": "Do you own any stocks yet (including a 401k or index fund)? YES / NOT YET 👇",
        "thumb": "A (NO PROFIT. WORTH BILLIONS?) or C (THE $1M BET) — B is fine too.",
        "next": "Pay in 4, 0% Interest? How Klarna Still Makes Billions",
    },
    "ep10": {
        "title": "Pay in 4, 0% Interest? How Klarna Still Makes Billions",
        "alts": ["Buy Now, Pay Later Isn't Free. Here's Who Pays", "Why Stores Happily Pay Klarna More Than Visa"],
        "line1": "How does buy now, pay later make money? You pay 0% interest, yet Klarna went public at ~$15B. Here's who's really paying, and the traps.",
        "summary": "Split a $200 purchase into four $50 payments with no interest. Sounds like free money, so how is it a $15 billion business? We follow the money from layaway in the 1930s to Klarna, Afterpay and Affirm, explain why stores happily pay bigger fees, the traps nearly half of users fall into, and how pay-in-4 compares to a credit card.",
        "learn": ["How buy now, pay later actually works", "From layaway to Klarna: a short history", "Who pays for your 0% interest", "Why stores happily pay bigger fees", "The 4 traps (stacking, late fees, hidden debt)", "Pay in 4 vs credit card: which is better?"],
        "tags": ["buy now pay later", "how klarna makes money", "bnpl explained", "afterpay explained", "affirm explained", "pay in 4", "0 percent interest", "bnpl vs credit card", "bnpl late fees", "personal finance for beginners", "dave explains money"],
        "hashtags": ["#buynowpaylater", "#klarna", "#personalfinance"],
        "pinned": "Have you ever used pay-in-4? What did you buy? 👇 (Series 2 topics are being chosen from the comments!)",
        "thumb": "A (WHO PAYS?) or C (THE TRAP) — B repeats '$15 billion'.",
        "next": None,
    },
    "ep11": {
        "title": "How Airlines Really Make Money (It's Not Flying)",
        "alts": ["Airlines Make $8 Per Passenger. Here's Their Real Business", "Why United's Miles Were Worth More Than United"],
        "line1": "How do airlines make money? They earn about $8 per passenger from flying, but billions from selling miles to banks. Your airline is secretly a bank.",
        "summary": "Dave buys a $300 ticket and the airline keeps about $8. So how do airlines survive? We follow Dave's ticket money, Warren Buffett's famous warning, the miles 'money printer', the $22 billion miles program worth more than the airline, bag fees, and why the person next to you paid less.",
        "learn": ["Where your plane ticket money really goes", "Why Warren Buffett called airlines the worst business", "How airlines print miles and sell them to banks", "Why United's miles were worth more than United", "Why your miles keep losing value", "Why the passenger next to you paid less"],
        "tags": ["how airlines make money", "airline business model", "airline miles explained", "frequent flyer programs", "how credit card miles work", "delta amex", "united mileageplus", "airline fees", "why flights are cheap", "business explained", "dave explains money"],
        "hashtags": ["#airlines", "#travel", "#business"],
        "pinned": "How many airline miles do you have sitting in an account right now? Guess a number 👇",
        "thumb": "A ($8 PROFIT?!) pairs best; test B (SECRET PRINTER) against it.",
        "next": None,
    },
}


def chapters_from(ep):
    txt = (VIDEOS / ep / f"{ep}_youtube.txt").read_text(encoding="utf-8")
    m = re.search(r"⏱ Chapters\n(.*?)\n\n", txt, re.S)
    return m.group(1).strip().splitlines() if m else []


def build(ep):
    s = SEO[ep]
    spec_p = ROOT / "pipeline" / "episodes" / f"{ep}.json"
    spec = json.loads(spec_p.read_text(encoding="utf-8"))
    spec["youtube"] = {
        "title": s["title"], "alt_titles": s["alts"], "hook": s["line1"] + " " + s["summary"],
        "tags": s["tags"], "hashtags": s["hashtags"], "pinned": s["pinned"],
    }
    spec_p.write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding="utf-8")
    ch = chapters_from(ep)
    desc = [s["line1"], "", s["summary"], "", "📌 In this video you'll learn:"] + [f"✅ {x}" for x in s["learn"]]
    desc += ["", "⏱ Chapters"] + ch
    desc += ["", "🔔 Subscribe to Dave Explains Money: money, business & economics explained so simply a duck gets it. New videos every Friday & Sunday."]
    nxt = f"ep{int(ep[2:]) + 1:02d}"
    if nxt in SEO:
        desc += [f"▶️ Watch next: {SEO[nxt]['title']}"]
    desc += ["", "📚 Sources"] + [f"• {x}" for x in spec.get("sources", [])]
    desc += ["", "🎵 Music: \"Fluffing a Duck\" Kevin MacLeod (incompetech.com)", "Licensed under Creative Commons: By Attribution 4.0 License", "http://creativecommons.org/licenses/by/4.0/", "",
             "⚠️ This video is for education and entertainment only. It is not financial advice.", "", " ".join(s["hashtags"])]
    body = "\n".join(desc)
    out = [
        f"===== {ep.upper()} UPLOAD KIT =====", "",
        "TITLE (use this):", s["title"], "",
        "A/B TEST TITLES (YouTube Studio > Test & Compare):", *[f"- {a}" for a in s["alts"]], "",
        "THUMBNAIL: " + s["thumb"], "",
        "DESCRIPTION (copy everything between the lines):", "-" * 60, body, "-" * 60, "",
        "TAGS (paste into Tags box):", ", ".join(s["tags"]), "",
        "PINNED COMMENT (post it yourself, then pin it):", s["pinned"], "",
        "SETTINGS: Audience = Not made for kids · Category = Education · Altered content = No (animated) · Language = English · Captions: upload not needed (auto) · End screen: next video + subscribe",
    ]
    (VIDEOS / ep / f"{ep}_UPLOAD.txt").write_text("\n".join(out), encoding="utf-8")
    return len(body), len(", ".join(s["tags"]))


if __name__ == "__main__":
    for ep in sys.argv[1:] or sorted(SEO):
        d, t = build(ep)
        print(f"{ep}: title {len(SEO[ep]['title'])} chars, description {d} chars, tags {t} chars")
