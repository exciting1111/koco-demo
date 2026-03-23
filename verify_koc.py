from playwright.sync_api import sync_playwright
import time, os

URL = "http://localhost:8080/index.html"
os.makedirs('/home/ubuntu/koco-demo/screenshots', exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 760})

    for lang in ['VN', 'CN', 'ID']:
        page.goto(URL, wait_until='networkidle')
        time.sleep(0.8)
        # Switch language
        page.click('#langTrigger')
        time.sleep(0.3)
        page.click(f'.lang-option[data-lang="{lang}"]')
        time.sleep(0.6)
        # Scroll to KOC section
        page.evaluate('''() => {
            const el = document.querySelector('.koc-section');
            if (el) el.scrollIntoView({behavior: "instant", block: "center"});
        }''')
        time.sleep(0.4)
        page.screenshot(path=f'/home/ubuntu/koco-demo/screenshots/koc_{lang}.png',
                        clip={'x': 0, 'y': 0, 'width': 1280, 'height': 760})
        print(f"[{lang}] KOC screenshot saved")

    browser.close()
    print("Done!")
