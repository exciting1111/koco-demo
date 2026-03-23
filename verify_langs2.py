"""
Verify all 3 language versions by reloading the page for each language.
"""
from playwright.sync_api import sync_playwright
import time, os

URL = "http://localhost:8080/index.html"
os.makedirs('/home/ubuntu/koco-demo/screenshots', exist_ok=True)

def screenshot_lang(page, lang):
    # Reload fresh
    page.goto(URL, wait_until='networkidle')
    time.sleep(0.8)

    # Switch language
    page.click('#langTrigger')
    time.sleep(0.3)
    page.click(f'.lang-option[data-lang="{lang}"]')
    time.sleep(0.6)

    # Hero screenshot (top of page)
    page.evaluate('window.scrollTo(0, 0)')
    time.sleep(0.3)
    page.screenshot(path=f'/home/ubuntu/koco-demo/screenshots/v_{lang}_hero.png',
                    clip={'x': 0, 'y': 0, 'width': 1280, 'height': 760})
    print(f"  [{lang}] Hero saved")

    # Scenarios screenshot
    # Find the scenarios section position
    y = page.evaluate('''() => {
        const el = document.querySelector('.scenarios-section');
        return el ? el.getBoundingClientRect().top + window.scrollY : 2200;
    }''')
    page.evaluate(f'window.scrollTo(0, {y})')
    time.sleep(0.4)
    page.screenshot(path=f'/home/ubuntu/koco-demo/screenshots/v_{lang}_scenarios.png',
                    clip={'x': 0, 'y': 0, 'width': 1280, 'height': 760})
    print(f"  [{lang}] Scenarios saved")

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 760})

    for lang in ['VN', 'CN', 'ID']:
        print(f"\n=== {lang} ===")
        screenshot_lang(page, lang)

    browser.close()
    print("\nAll done!")
