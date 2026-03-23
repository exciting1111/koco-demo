from PIL import Image
import numpy as np

# 打开图片
img = Image.open('/home/ubuntu/koco-demo/images/slide2-products-v2.png').convert('RGBA')
data = np.array(img)

# 获取 RGB 和 Alpha 通道
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# 识别接近白色/浅色的背景像素（R>220, G>210, B>200）
# 使用更精确的条件：非常亮的像素
white_mask = (r > 220) & (g > 210) & (b > 200)

# 对白色背景像素设置透明度（渐变边缘处理）
# 计算每个像素距离白色的程度
brightness = (r.astype(float) + g.astype(float) + b.astype(float)) / 3

# 创建新的 alpha 通道
new_alpha = np.where(white_mask, 
                     np.clip((255 - brightness) * 3, 0, 255).astype(np.uint8),
                     a)

# 对非常亮的像素（>240）完全透明
very_white = (r > 240) & (g > 235) & (b > 230)
new_alpha = np.where(very_white, 0, new_alpha)

# 应用新的 alpha 通道
data[:,:,3] = new_alpha

# 保存结果
result = Image.fromarray(data)
result.save('/home/ubuntu/koco-demo/images/slide2-products-nobg.png')
print("Done! Saved to slide2-products-nobg.png")
