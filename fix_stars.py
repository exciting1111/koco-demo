#!/usr/bin/env python3
# 批量替换所有文件中残留的 ⭐ emoji 为心愿星图片标签
# 使用两种替换策略：
# 1. HTML 文件中：替换为 <img> 标签
# 2. JS 文件中的翻译字符串：替换为 HTML img 标签（因为这些字符串会被 innerHTML 渲染）

import re

STAR_IMG_HTML = '<img src="images/lucky-star-icon.png" alt="★" class="star-img-inline" />'
STAR_IMG_JS   = '<img src=\\"images/lucky-star-icon.png\\" alt=\\"★\\" class=\\"star-img-inline\\" />'

# ─── account.html ────────────────────────────────────────────────────────────
with open('account.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 替换所有 ⭐（HTML 文件直接替换）
content = content.replace('⭐', STAR_IMG_HTML)

with open('account.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("account.html: done")

# ─── index.html ──────────────────────────────────────────────────────────────
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('⭐', STAR_IMG_HTML)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("index.html: done")

# ─── script.js ───────────────────────────────────────────────────────────────
# JS 文件中的 ⭐ 出现在字符串里，这些字符串会被 innerHTML 插入，所以也替换为 img 标签
with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 在 JS 字符串中替换 ⭐
content = content.replace('⭐', STAR_IMG_JS.replace('\\"', '"'))

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("script.js: done")

print("All done!")
