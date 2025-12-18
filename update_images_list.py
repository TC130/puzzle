#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
自动生成 images_list.json 文件
扫描 images/4、images/6、images/9 文件夹中的图片文件
"""

import os
import json
import glob

def get_images_in_folder(folder_path):
    """获取文件夹中的所有图片文件"""
    images = []
    if os.path.exists(folder_path):
        # 支持的图片格式
        extensions = ['*.png', '*.jpg', '*.jpeg', '*.PNG', '*.JPG', '*.JPEG']
        for ext in extensions:
            pattern = os.path.join(folder_path, ext)
            for file_path in glob.glob(pattern):
                filename = os.path.basename(file_path)
                # 提取文件名（不含扩展名）作为显示名称
                name = os.path.splitext(filename)[0].replace('_', ' ').replace('-', ' ')
                images.append({
                    "name": name,
                    "file": filename
                })
    return images

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(base_dir, 'images')
    
    print("正在扫描图片文件...")
    
    # 扫描各个文件夹
    result = {
        "4": get_images_in_folder(os.path.join(images_dir, "4")),
        "6": get_images_in_folder(os.path.join(images_dir, "6")),
        "9": get_images_in_folder(os.path.join(images_dir, "9"))
    }
    
    # 保存到 JSON 文件
    json_file = os.path.join(base_dir, 'images_list.json')
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=2)
    
    print("✅ images_list.json 已更新！")
    print("\n当前图片列表：")
    print(json.dumps(result, ensure_ascii=False, indent=2))
    
    # 统计信息
    total = sum(len(images) for images in result.values())
    print(f"\n总计：4块={len(result['4'])}, 6块={len(result['6'])}, 9块={len(result['9'])}, 共{total}张图片")

if __name__ == '__main__':
    main()

