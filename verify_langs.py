"""
Verify all 3 language versions by taking screenshots of hero + scenarios sections.
"""
from playwright.sync_api import sync_playwright
import time

URL = "http://localhost:8080/index.html"

def take_screenshot(page, lang, section_y, filename):
    # Click the language option
    page.click(f'#langTrigger')
    time.sleep(0.3)
    page.click(f'.lang-option[data-lang="{lang}"]')
    time.sleep(0.5)
    # Scroll to section
    page.evaluate(f'window.scrollTo(0, {section_y})')
    time.sleep(0.4)
    page.screenshot(path=filename, clip={'x': 0, 'y': 0, 'width': 1280, 'height': 800})
    print(f"  Saved: {filename}")

with sync_playwright() as p:
    browser = p.chromium.launch(args=['--no-sandbox'])
    page = browser.new_page(viewport={'width': 1280, 'height': 800})
    page.goto(URL, wait_until='networkidle')
    time.sleep(1)

    import os
    os.makedirs('/home/ubuntu/koco-demo/screenshots', exist_ok=True)

    for lang in ['VN', 'CN', 'ID']:
        print(f"\n=== {lang} ===")
        # Hero section
        take_screenshot(page, lang, 0, f'/home/ubuntu/koco-demo/screenshots/verify_{lang}_hero.png')
        # Scenarios section (approx y=2200)
        take_screenshot(page, lang, 2200, f'/home/ubuntu/koco-demo/screenshots/verify_{lang}_scenarios.png')

    browser.close()
    print("\nAll screenshots done!")
