// 用于生成拼图图片的脚本（Node.js环境）
// 这个文件用于在Node.js环境中运行，生成图片文件

const fs = require('fs');
const { createCanvas } = require('canvas');

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
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.moveTo(width * 0.88, height * 0.25);
    ctx.lineTo(width * 0.95, height * 0.15);
    ctx.lineWidth = width * 0.04;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // 尾巴尖的毛（第3列，第1行）
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(width * 0.95, height * 0.15, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
}

// 绘制适合16块拼图的卡通动物（4x4 = 800x800，每块200x200）
function draw16PieceAnimal(ctx, width, height) {
    // 背景色 - 渐变天空
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // 绘制一个可爱的卡通狮子，确保每一块都有内容（4列x4行）
    
    // 第一列：头部左半部分
    // 头部（第1-2列，第1-2行）
    ctx.fillStyle = '#ffb84d';
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.4, width * 0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // 左耳（第1列，第1行）
    ctx.fillStyle = '#e69138';
    ctx.beginPath();
    ctx.arc(width * 0.3, height * 0.25, width * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // 左眉毛（第1列，第1行）
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = width * 0.02;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(width * 0.35, height * 0.3);
    ctx.lineTo(width * 0.45, height * 0.28);
    ctx.stroke();
    
    // 左眼（第1列，第2行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.38, height * 0.38, width * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width * 0.38, height * 0.38, width * 0.02, 0, Math.PI * 2);
    ctx.fill();
    
    // 左眼高光（第1列，第2行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.39, height * 0.37, width * 0.01, 0, Math.PI * 2);
    ctx.fill();
    
    // 第二列：头部右半部分
    // 右耳（第2列，第1行）
    ctx.fillStyle = '#e69138';
    ctx.beginPath();
    ctx.arc(width * 0.7, height * 0.25, width * 0.08, 0, Math.PI * 2);
    ctx.fill();
    
    // 右眉毛（第2列，第1行）
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = width * 0.02;
    ctx.beginPath();
    ctx.moveTo(width * 0.55, height * 0.28);
    ctx.lineTo(width * 0.65, height * 0.3);
    ctx.stroke();
    
    // 右眼（第2列，第2行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.62, height * 0.38, width * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(width * 0.62, height * 0.38, width * 0.02, 0, Math.PI * 2);
    ctx.fill();
    
    // 右眼高光（第2列，第2行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(width * 0.63, height * 0.37, width * 0.01, 0, Math.PI * 2);
    ctx.fill();
    
    // 鼻子和嘴巴（第1-2列，第2-3行）
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.48, width * 0.06, width * 0.04, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 嘴巴（第1-2列，第3行）
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = width * 0.02;
    ctx.beginPath();
    ctx.arc(width * 0.5, height * 0.52, width * 0.1, 0, Math.PI);
    ctx.stroke();
    
    // 第三列：身体左半部分
    // 左前腿（第3列，第3-4行）
    ctx.fillStyle = '#ffb84d';
    ctx.fillRect(width * 0.3, height * 0.6, width * 0.1, height * 0.35);
    
    // 左前腿上的斑点（第3列，第3行）
    ctx.fillStyle = '#e69138';
    ctx.fillRect(width * 0.32, height * 0.65, width * 0.06, height * 0.08);
    
    // 左前腿上的斑点（第3列，第4行）
    ctx.fillRect(width * 0.32, height * 0.8, width * 0.06, height * 0.08);
    
    // 第四列：身体右半部分
    // 右前腿（第4列，第3-4行）
    ctx.fillStyle = '#ffb84d';
    ctx.fillRect(width * 0.6, height * 0.6, width * 0.1, height * 0.35);
    
    // 右前腿上的斑点（第4列，第3行）
    ctx.fillStyle = '#e69138';
    ctx.fillRect(width * 0.62, height * 0.65, width * 0.06, height * 0.08);
    
    // 右前腿上的斑点（第4列，第4行）
    ctx.fillRect(width * 0.62, height * 0.8, width * 0.06, height * 0.08);
    
    // 左后腿（第1-2列，第3-4行）
    ctx.fillStyle = '#ffb84d';
    ctx.fillRect(width * 0.15, height * 0.6, width * 0.1, height * 0.35);
    
    // 左后腿上的斑点（第1列，第3行）
    ctx.fillStyle = '#e69138';
    ctx.fillRect(width * 0.17, height * 0.65, width * 0.06, height * 0.08);
    
    // 右后腿（第3-4列，第3-4行）
    ctx.fillStyle = '#ffb84d';
    ctx.fillRect(width * 0.75, height * 0.6, width * 0.1, height * 0.35);
    
    // 右后腿上的斑点（第4列，第3行）
    ctx.fillStyle = '#e69138';
    ctx.fillRect(width * 0.77, height * 0.65, width * 0.06, height * 0.08);
    
    // 尾巴（第4列，第2-3行）
    ctx.strokeStyle = '#e69138';
    ctx.lineWidth = width * 0.05;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(width * 0.75, height * 0.55);
    ctx.lineTo(width * 0.88, height * 0.45);
    ctx.stroke();
    
    // 尾巴尖（第4列，第2行）
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(width * 0.88, height * 0.45, width * 0.03, 0, Math.PI * 2);
    ctx.fill();
    
    // 胸部（第2-3列，第3行）
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.6, width * 0.2, height * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 鬃毛（包围头部，跨多列）
    ctx.fillStyle = '#e69138';
    for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const x = width * 0.5 + Math.cos(angle) * width * 0.32;
        const y = height * 0.4 + Math.sin(angle) * width * 0.32;
        ctx.beginPath();
        ctx.arc(x, y, width * 0.05, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 生成图片文件
function generateImages() {
    // 生成4块拼图图片（2x2 = 400x400）
    const canvas4 = createCanvas(400, 400);
    const ctx4 = canvas4.getContext('2d');
    draw4PieceAnimal(ctx4, 400, 400);
    const buffer4 = canvas4.toBuffer('image/png');
    fs.writeFileSync('images/4/panda_4pieces.png', buffer4);
    console.log('✓ 生成 4块拼图图片: images/4/panda_4pieces.png');
    
    // 生成6块拼图图片（3x2 = 600x400）
    const canvas6 = createCanvas(600, 400);
    const ctx6 = canvas6.getContext('2d');
    draw6PieceAnimal(ctx6, 600, 400);
    const buffer6 = canvas6.toBuffer('image/png');
    fs.writeFileSync('images/6/giraffe_6pieces.png', buffer6);
    console.log('✓ 生成 6块拼图图片: images/6/giraffe_6pieces.png');
    
    // 生成16块拼图图片（4x4 = 800x800）
    const canvas16 = createCanvas(800, 800);
    const ctx16 = canvas16.getContext('2d');
    draw16PieceAnimal(ctx16, 800, 800);
    const buffer16 = canvas16.toBuffer('image/png');
    fs.writeFileSync('images/4/lion_16pieces.png', buffer16);
    console.log('✓ 生成 16块拼图图片: images/4/lion_16pieces.png');
}

// 如果直接运行此文件
if (require.main === module) {
    generateImages();
}

module.exports = { generateImages, draw4PieceAnimal, draw6PieceAnimal };

