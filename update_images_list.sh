#!/bin/bash

# 自动生成 images_list.json 文件
# 扫描 images/4、images/6、images/9 文件夹中的图片文件

echo "正在扫描图片文件..."

# 创建 JSON 文件
echo "{" > images_list.json

# 处理 4 块拼图文件夹
echo "  \"4\": [" >> images_list.json
first4=true
if [ -d "images/4" ]; then
    for file in images/4/*.png images/4/*.jpg images/4/*.jpeg images/4/*.PNG images/4/*.JPG images/4/*.JPEG 2>/dev/null; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ "$first4" = true ]; then
                first4=false
            else
                echo "," >> images_list.json
            fi
            # 提取文件名（不含扩展名）作为显示名称
            name=$(basename "$filename" | sed 's/\.[^.]*$//' | sed 's/_/ /g')
            echo -n "    { \"name\": \"$name\", \"file\": \"$filename\" }" >> images_list.json
        fi
    done
fi
echo "" >> images_list.json
echo "  ]," >> images_list.json

# 处理 6 块拼图文件夹
echo "  \"6\": [" >> images_list.json
first6=true
if [ -d "images/6" ]; then
    for file in images/6/*.png images/6/*.jpg images/6/*.jpeg images/6/*.PNG images/6/*.JPG images/6/*.JPEG 2>/dev/null; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ "$first6" = true ]; then
                first6=false
            else
                echo "," >> images_list.json
            fi
            name=$(basename "$filename" | sed 's/\.[^.]*$//' | sed 's/_/ /g')
            echo -n "    { \"name\": \"$name\", \"file\": \"$filename\" }" >> images_list.json
        fi
    done
fi
echo "" >> images_list.json
echo "  ]," >> images_list.json

# 处理 9 块拼图文件夹
echo "  \"9\": [" >> images_list.json
first9=true
if [ -d "images/9" ]; then
    for file in images/9/*.png images/9/*.jpg images/9/*.jpeg images/9/*.PNG images/9/*.JPG images/9/*.JPEG 2>/dev/null; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            if [ "$first9" = true ]; then
                first9=false
            else
                echo "," >> images_list.json
            fi
            name=$(basename "$filename" | sed 's/\.[^.]*$//' | sed 's/_/ /g')
            echo -n "    { \"name\": \"$name\", \"file\": \"$filename\" }" >> images_list.json
        fi
    done
fi
echo "" >> images_list.json
echo "  ]" >> images_list.json

echo "}" >> images_list.json

echo "✅ images_list.json 已更新！"
echo ""
echo "当前图片列表："
cat images_list.json
