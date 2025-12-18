// 用于生成拼图图片的命令行工具（Node.js环境）
// 支持生成4块、9块拼图图片
// 使用方法：node generate_images_cli.js [4|9] [cartoon|realistic]
// 示例：node generate_images_cli.js 4 cartoon

const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const sharp = require('sharp');

// 确保目录存在
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 绘制适合4块拼图的卡通动物（2x2 = 400x400，每块200x200）
function draw4PieceAnimal(ctx, width, height) {
    // 背景色
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, width, height);
    
    // 绘制一个可爱的熊猫，确保每一块都有内容
    
    // 左上角（0,0）：头部上部
    // 熊猫头部
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.4, width * 0.35, 0, Math.PI * 2);
    ctx.fill();
    
    // 左耳（左上角）
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width * 0.25, height * 0.25, width * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // 右耳（右上角）
    ctx.beginPath();
    ctx.arc(width * 0.75, height * 0.25, width * 0.12, 0, Math.PI * 2);
    ctx.fill();
    
    // 左眼斑（左上角区域）
    ctx.beginPath();
    ctx.ellipse(width * 0.35, height * 0.35, width * 0.1, width * 0.12, -0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // 右眼斑（右上角区域）
    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.35, width * 0.1, width * 0.12, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛高光（左上和右上都有）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.35, height * 0.35, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.65, height * 0.35, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
    
    // 左下角（0,1）：身体左部
    // 熊猫身体
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.4, height * 0.75, width * 0.25, height * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 左手臂（左下角）
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(width * 0.2, height * 0.7, width * 0.1, height * 0.15, -0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // 左腿（左下角）
    ctx.beginPath();
    ctx.ellipse(width * 0.35, height * 0.9, width * 0.12, height * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 右下角（1,1）：身体右部
    // 右手臂（右下角）
    ctx.beginPath();
    ctx.ellipse(width * 0.8, height * 0.7, width * 0.1, height * 0.15, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // 右腿（右下角）
    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.9, width * 0.12, height * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 鼻子（中心，跨多个区域）
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.5, width * 0.04, width * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 嘴巴（中心下方）
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.55, width * 0.06, 0, Math.PI);
    ctx.stroke();
    
    // 添加一些细节确保每块都有内容
    // 肚子上的阴影（左下和右下）
    ctx.fillStyle = '#f0f0f0';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.75, width * 0.2, height * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制适合6块拼图的卡通动物（3x2 = 600x400，每块200x200）
function draw6PieceAnimal(ctx, width, height) {
    // 背景色 - 渐变天空
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#87ceeb');
    gradient.addColorStop(1, '#e0f6ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制一个长颈鹿，确保每一块都有内容（3列x2行）
    
    // 第一列：头部和脖子
    // 头部（第1列，第1行）
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.ellipse(width * 0.16, height * 0.25, width * 0.12, height * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 左耳（第1列，第1行）
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.ellipse(width * 0.12, height * 0.18, width * 0.04, height * 0.06, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(width * 0.16, height * 0.16, width * 0.035, height * 0.055, 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛（第1列，第1行）
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width * 0.15, height * 0.25, width * 0.015, 0, Math.PI * 2);
    ctx.fill();
    
    // 脖子（第1列，第2行）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width * 0.1, height * 0.5, width * 0.12, height * 0.45);
    
    // 脖子上的斑点（第1列，第2行）
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(width * 0.12, height * 0.6, width * 0.06, height * 0.08);
    ctx.fillRect(width * 0.11, height * 0.75, width * 0.05, height * 0.06);
    
    // 第二列：身体上部
    // 身体上部（第2列，第1行）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width * 0.4, height * 0.2, width * 0.25, height * 0.3);
    
    // 身体上的斑点（第2列，第1行）
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(width * 0.45, height * 0.25, width * 0.08, height * 0.1);
    ctx.fillRect(width * 0.52, height * 0.3, width * 0.1, height * 0.12);
    
    // 连接脖子的部分（第2列，第1行）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width * 0.28, height * 0.35, width * 0.15, height * 0.15);
    
    // 第三列：身体下部和腿部
    // 身体下部（第3列，第1行）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width * 0.7, height * 0.25, width * 0.25, height * 0.25);
    
    // 身体上的斑点（第3列，第1行）
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(width * 0.72, height * 0.3, width * 0.1, height * 0.1);
    ctx.fillRect(width * 0.8, height * 0.28, width * 0.08, height * 0.12);
    
    // 后腿上部（第3列，第2行）
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(width * 0.75, height * 0.5, width * 0.15, height * 0.2);
    
    // 后腿下部（第3列，第2行）
    ctx.fillRect(width * 0.78, height * 0.7, width * 0.1, height * 0.25);
    
    // 前腿（第2列，第2行）
    ctx.fillRect(width * 0.42, height * 0.5, width * 0.1, height * 0.45);
    
    // 前腿上的斑点（第2列，第2行）
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(width * 0.44, height * 0.6, width * 0.05, height * 0.08);
    
    // 尾巴（第3列，第2行，上方）
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = width * 0.04;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(width * 0.88, height * 0.25);
    ctx.lineTo(width * 0.95, height * 0.15);
    ctx.stroke();
    
    // 尾巴尖的毛（第3列，第1行）
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(width * 0.95, height * 0.15, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制适合9块拼图的卡通动物（3x3 = 600x600，每块200x200）
function draw9PieceAnimal(ctx, width, height) {
    // 背景色 - 渐变森林
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#90ee90');
    gradient.addColorStop(1, '#228b22');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制一个可爱的兔子，确保每一块都有内容（3列x3行）
    
    // 头部（第2列，第1行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.3, width * 0.25, 0, Math.PI * 2);
    ctx.fill();
    
    // 左耳（第1列，第1行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.3, height * 0.2, width * 0.1, height * 0.25, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 左耳内部（第1列，第1行）
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.ellipse(width * 0.3, height * 0.2, width * 0.06, height * 0.18, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 右耳（第3列，第1行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.7, height * 0.2, width * 0.1, height * 0.25, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 右耳内部（第3列，第1行）
    ctx.fillStyle = '#ffb6c1';
    ctx.beginPath();
    ctx.ellipse(width * 0.7, height * 0.2, width * 0.06, height * 0.18, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 左眼（第1-2列，第1-2行）
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width * 0.42, height * 0.3, width * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    // 右眼（第2-3列，第1-2行）
    ctx.beginPath();
    ctx.arc(width * 0.58, height * 0.3, width * 0.05, 0, Math.PI * 2);
    ctx.fill();
    
    // 鼻子（第2列，第2行）
    ctx.fillStyle = '#ff69b4';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.38, width * 0.06, width * 0.04, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 嘴巴（第2列，第2行）
    ctx.strokeStyle = '#ff69b4';
    ctx.lineWidth = width * 0.02;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(width * 0.5, height * 0.4);
    ctx.lineTo(width * 0.5, height * 0.45);
    ctx.stroke();
    
    // 身体（第2列，第2-3行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.65, width * 0.3, height * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 前腿（第1-2列，第3行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.35, height * 0.85, width * 0.08, height * 0.15, -0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // 前腿（第2-3列，第3行）
    ctx.beginPath();
    ctx.ellipse(width * 0.65, height * 0.85, width * 0.08, height * 0.15, 0.5, 0, Math.PI * 2);
    ctx.fill();
    
    // 后腿（第1列，第3行）
    ctx.beginPath();
    ctx.ellipse(width * 0.25, height * 0.75, width * 0.08, height * 0.15, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 后腿（第3列，第3行）
    ctx.beginPath();
    ctx.ellipse(width * 0.75, height * 0.75, width * 0.08, height * 0.15, 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 尾巴（第3列，第2-3行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.6, width * 0.1, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fill();
    ctx.fillRect(width * 0.78, height * 0.5, width * 0.07, width * 0.2);
    
    // 添加一些细节确保每块都有内容
    // 草地上的小花（第1列，第3行）
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(width * 0.15, height * 0.9, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
    
    // 草地上的小花（第3列，第3行）
    ctx.beginPath();
    ctx.arc(width * 0.85, height * 0.9, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
}

// 生成卡通图片
function generateCartoonImage(pieceCount) {
    console.log(`正在生成 ${pieceCount} 块卡通图片...`);
    
    ensureDir(`images/${pieceCount}`);
    
    let width, height;
    let drawFunction;
    let filename;
    let animalName;
    
    switch (pieceCount) {
        case 4:
            width = 400;
            height = 400;
            drawFunction = draw4PieceAnimal;
            animalName = 'panda';
            filename = `${animalName}_${pieceCount}pieces.png`;
            break;
        case 9:
            width = 900;
            height = 900;
            drawFunction = draw9PieceAnimal;
            animalName = 'rabbit';
            filename = `${animalName}_${pieceCount}pieces.png`;
            break;
        default:
            throw new Error('不支持的拼图块数，仅支持4、9块');
    }
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    drawFunction(ctx, width, height);
    
    const buffer = canvas.toBuffer('image/png');
    const outputPath = path.join('images', `${pieceCount}`, filename);
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✓ 生成 ${pieceCount} 块卡通图片: ${outputPath}`);
    return outputPath;
}

// 下载并保存图片
async function downloadAndSaveImage(url, outputPath, width, height) {
    try {
        // 从URL下载图片并调整大小
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        // 在Node.js中，使用arrayBuffer()然后转换为Buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // 使用sharp调整图片大小并保存
        await sharp(buffer)
            .resize(width, height, {
                fit: 'cover',
                position: 'center'
            })
            .png()
            .toFile(outputPath);
    } catch (error) {
        // 如果下载失败，生成一个占位符图片
        console.warn(`⚠️ 下载图片失败，生成占位符图片: ${error.message}`);
        await generatePlaceholderImage(outputPath, width, height);
    }
}

// 生成占位符图片
async function generatePlaceholderImage(outputPath, width, height) {
    // 创建一个带渐变色的占位符图片
    const svg = `
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#f0f0f0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#e0e0e0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#bg)" />
            <text x="50%" y="50%" font-family="Arial" font-size="${Math.min(width, height) / 10}" 
                  fill="#888888" text-anchor="middle" dominant-baseline="middle">
                ${width}x${height} 拼图图片
            </text>
        </svg>
    `;
    
    await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
}

// 生成真实图片
async function generateRealisticImage(pieceCount) {
    console.log(`正在生成 ${pieceCount} 块真实图片...`);
    
    ensureDir(`images/${pieceCount}`);
    
    let width, height;
    const animals = ['lion', 'elephant', 'panda'];
    
    switch (pieceCount) {
        case 4:
            width = 400;
            height = 400;
            break;
        case 9:
            width = 900;
            height = 900;
            break;
        default:
            throw new Error('不支持的拼图块数，仅支持4、9块');
    }
    
    // 动物图片URL
    const animalUrls = {
        lion: `https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=${width}&h=${height}&fit=crop`,
        elephant: `https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=${width}&h=${height}&fit=crop`,
        panda: `https://images.unsplash.com/photo-1570594123349-4c6ce005b128?w=${width}&h=${height}&fit=crop`
    };
    
    // 生成每种动物的图片
    for (const animal of animals) {
        const filename = `${animal}_realistic_${pieceCount}pieces.png`;
        const outputPath = path.join('images', `${pieceCount}`, filename);
        await downloadAndSaveImage(animalUrls[animal], outputPath, width, height);
        console.log(`✓ 生成 ${pieceCount} 块真实图片: ${outputPath}`);
    }
}

// 更新图片列表
function updateImagesList() {
    console.log('\n正在更新图片列表...');
    
    const imageList = {
        "4": [],
        "6": [],
        "9": []
    };
    
    // 扫描各个文件夹中的图片
    const folders = [
        { folder: "4", key: "4" },
        { folder: "6", key: "6" },
        { folder: "9", key: "9" }
    ];
    
    for (const { folder, key } of folders) {
        const folderPath = path.join('images', folder);
        if (fs.existsSync(folderPath)) {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
                    // 从文件名生成显示名称
                    const name = file.replace(/\.[^/.]+$/, "").replace(/_/g, ' ').replace(/-/g, ' ');
                    imageList[key].push({
                        "name": name,
                        "file": file
                    });
                }
            }
        }
    }
    
    // 保存到JSON文件
    fs.writeFileSync('images_list.json', JSON.stringify(imageList, null, 2));
    console.log('✅ images_list.json 已更新！');
}

// 主函数
async function main() {
    try {
        // 获取命令行参数
        const args = process.argv.slice(2);
        let pieceCount = parseInt(args[0]);
        let imageType = args[1] || 'cartoon';
        
        // 验证参数
        if (![4, 9].includes(pieceCount)) {
            console.error('❌ 无效的拼图块数，仅支持4、9块');
            console.log('使用方法：node generate_images_cli.js [4|9] [cartoon|realistic]');
            console.log('示例：node generate_images_cli.js 4 cartoon');
            process.exit(1);
        }
        
        if (!['cartoon', 'realistic'].includes(imageType)) {
            console.error('❌ 无效的图片类型，仅支持cartoon或realistic');
            console.log('使用方法：node generate_images_cli.js [4|6|9] [cartoon|realistic]');
            console.log('示例：node generate_images_cli.js 4 cartoon');
            process.exit(1);
        }
        
        console.log(`📌 开始生成 ${pieceCount} 块 ${imageType} 图片...`);
        
        // 生成图片
        if (imageType === 'cartoon') {
            generateCartoonImage(pieceCount);
        } else {
            await generateRealisticImage(pieceCount);
        }
        
        // 更新图片列表
        updateImagesList();
        
        console.log('\n🎉 图片生成完成！');
        console.log(`📁 图片已保存到 images/${pieceCount}/ 目录`);
        
    } catch (error) {
        console.error('❌ 生成图片时出错:', error.message);
        process.exit(1);
    }
}

// 如果直接运行此文件
if (require.main === module) {
    main();
}

module.exports = { generateCartoonImage, generateRealisticImage, updateImagesList };
