from PIL import Image, ImageDraw, ImageFilter
import numpy as np

# 创建橙色渐变背景 (1600x800)
W, H = 1600, 800
bg = Image.new('RGBA', (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(bg)

# 绘制橙色渐变背景 (从浅橙到深橙，与 slide-1 协调)
for y in range(H):
    for x in range(W):
        # 左上角更亮，右下角更深
        t_x = x / W
        t_y = y / H
        r = int(255 - t_x * 30 - t_y * 20)
        g = int(140 - t_x * 40 - t_y * 30)
        b = int(50 - t_x * 20 - t_y * 15)
        r = max(200, min(255, r))
        g = max(80, min(160, g))
        b = max(20, min(80, b))
        draw.point((x, y), fill=(r, g, b, 255))

# 用更快的方式创建渐变
bg = Image.new('RGB', (W, H))
pixels = np.zeros((H, W, 3), dtype=np.uint8)

for y in range(H):
    for x in range(W):
        t = x / W + y / H * 0.3
        # 橙色渐变: #FF8C42 -> #FF4500
        r = int(255)
        g = int(140 - t * 60)
        b = int(66 - t * 50)
        g = max(50, min(160, g))
        b = max(10, min(80, b))
        pixels[y, x] = [r, g, b]

bg = Image.fromarray(pixels, 'RGB').convert('RGBA')

# 加载商品图
products = Image.open('/home/ubuntu/koco-demo/images/slide2-products-v2.png').convert('RGBA')

# 去除白色背景 - 更激进的方式
prod_data = np.array(products)
r, g, b, a = prod_data[:,:,0], prod_data[:,:,1], prod_data[:,:,2], prod_data[:,:,3]

# 计算与白色的距离
dist_from_white = np.sqrt(
    (r.astype(float) - 255)**2 + 
    (g.astype(float) - 255)**2 + 
    (b.astype(float) - 255)**2
)

# 亮度
brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3

# 设置 alpha：距离白色越近越透明
# 阈值：距离 < 60 的像素逐渐变透明
threshold = 80
new_alpha = np.clip((dist_from_white / threshold) * 255, 0, 255).astype(np.uint8)

# 对非常亮的区域（亮度 > 230）完全透明
very_bright = brightness > 235
new_alpha = np.where(very_bright, 0, new_alpha)

# 保留原有 alpha（如果原图已有透明区域）
new_alpha = np.minimum(new_alpha, a)

prod_data[:,:,3] = new_alpha
products_nobg = Image.fromarray(prod_data)

# 调整商品图大小，放在右侧
prod_w, prod_h = products_nobg.size
scale = min(700 / prod_w, 680 / prod_h)
new_w = int(prod_w * scale)
new_h = int(prod_h * scale)
products_resized = products_nobg.resize((new_w, new_h), Image.LANCZOS)

# 将商品图放置在右侧居中
x_offset = W - new_w - 20
y_offset = (H - new_h) // 2

# 合成
result = bg.copy()
result.paste(products_resized, (x_offset, y_offset), products_resized)

# 保存
result_rgb = result.convert('RGB')
result_rgb.save('/home/ubuntu/koco-demo/images/slide2-banner.jpg', quality=95)
print(f"Done! Banner size: {result_rgb.size}")
