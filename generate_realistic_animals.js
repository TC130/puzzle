// 用于生成真实动物图片的脚本（Node.js环境）
// 使用sharp库处理图像

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 确保目录存在
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 生成真实的动物图片
async function generateRealisticAnimals() {
    console.log('开始生成真实的动物图片...');
    
    // 确保目标目录存在
    ensureDir('images/4');
    ensureDir('images/6');
    ensureDir('images/9');
    
    // 定义动物图片URL（使用一些免费的动物图片API）
    // 注意：这些URL可能需要根据实际情况调整
    const animals = [
        {
            name: '狮子',
            urls: [
                'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['lion_realistic_4pieces.png', 'lion_realistic_6pieces.png', 'lion_realistic_9pieces.png'],
            position: 'left' // 裁剪位置，确保狮子脸在图片中
        },
        {
            name: '大象',
            urls: [
                'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?q=80&w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['elephant_realistic_4pieces.png', 'elephant_realistic_6pieces.png', 'elephant_realistic_9pieces.png']
        },
        {
            name: '熊猫',
            urls: [
                'https://images.unsplash.com/photo-1483909728909-799e046a2945?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1483909728909-799e046a2945?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1483909728909-799e046a2945?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['panda_realistic_4pieces.png', 'panda_realistic_6pieces.png', 'panda_realistic_9pieces.png']
        },
        {
            name: '老虎',
            urls: [
                'https://images.unsplash.com/photo-1588442366178-4729f07d852d?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1588442366178-4729f07d852d?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1588442366178-4729f07d852d?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['tiger_realistic_4pieces.png', 'tiger_realistic_6pieces.png', 'tiger_realistic_9pieces.png']
        },
        {
            name: '长颈鹿',
            urls: [
                'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['giraffe_realistic_4pieces.png', 'giraffe_realistic_6pieces.png', 'giraffe_realistic_9pieces.png']
        },
        {
            name: '猴子',
            urls: [
                'https://images.unsplash.com/photo-1559163499-413811fb2344?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1559163499-413811fb2344?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['monkey_realistic_4pieces.png', 'monkey_realistic_6pieces.png', 'monkey_realistic_9pieces.png']
        },
        {
            name: '斑马',
            urls: [
                'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['zebra_realistic_4pieces.png', 'zebra_realistic_6pieces.png', 'zebra_realistic_9pieces.png']
        },
        {
            name: '犀牛',
            urls: [
                'https://images.unsplash.com/photo-1574064624426-c5e4b51b9fbb?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1574064624426-c5e4b51b9fbb?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1574064624426-c5e4b51b9fbb?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['rhino_realistic_4pieces.png', 'rhino_realistic_6pieces.png', 'rhino_realistic_9pieces.png']
        },
        {
            name: '河马',
            urls: [
                'https://images.unsplash.com/photo-1555709727-b52b554664c7?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1555709727-b52b554664c7?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1555709727-b52b554664c7?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['hippo_realistic_4pieces.png', 'hippo_realistic_6pieces.png', 'hippo_realistic_9pieces.png']
        },
        {
            name: '鹿',
            urls: [
                'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['deer_realistic_4pieces.png', 'deer_realistic_6pieces.png', 'deer_realistic_9pieces.png']
        },
        {
            name: '狐狸',
            urls: [
                'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['fox_realistic_4pieces.png', 'fox_realistic_6pieces.png', 'fox_realistic_9pieces.png']
        },
        {
            name: '狼',
            urls: [
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',  // 400x400
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=400&fit=crop',  // 600x400
                'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&h=600&fit=crop'   // 600x600
            ],
            filenames: ['wolf_realistic_4pieces.png', 'wolf_realistic_6pieces.png', 'wolf_realistic_9pieces.png']
        }
    ];
    
    // 下载并保存每种动物的图片
    for (const animal of animals) {
        console.log(`\n正在处理${animal.name}图片...`);
        
        try {
            // 4块拼图图片 (400x400)
            await downloadAndSaveImage(
                animal.urls[0], 
                path.join('images', '4', animal.filenames[0]),
                400, 400,
                animal.position || 'center'
            );
            console.log(`✓ 生成 4块拼图图片: images/4/${animal.filenames[0]}`);
            
            // 6块拼图图片 (600x400)
            await downloadAndSaveImage(
                animal.urls[1], 
                path.join('images', '6', animal.filenames[1]),
                600, 400,
                animal.position || 'center'
            );
            console.log(`✓ 生成 6块拼图图片: images/6/${animal.filenames[1]}`);
            
            // 9块拼图图片 (600x600)
            await downloadAndSaveImage(
                animal.urls[2], 
                path.join('images', '9', animal.filenames[2]),
                600, 600,
                animal.position || 'center'
            );
            console.log(`✓ 生成 9块拼图图片: images/9/${animal.filenames[2]}`);
            
        } catch (error) {
            console.error(`✗ 处理${animal.name}图片时出错:`, error.message);
            // 继续处理其他动物
            continue;
        }
    }
    
    console.log('\n✅ 所有真实动物图片生成完成！');
    
    // 更新图片列表
    updateImagesList();
}

// 下载并保存图片
async function downloadAndSaveImage(url, outputPath, width, height, position = 'center') {
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
            position: position
        })
        .png()
        .toFile(outputPath);
}

// 生成占位符图片（当网络图片下载失败时使用）
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
                占位符图片
            </text>
        </svg>
    `;
    
    await sharp(Buffer.from(svg))
        .png()
        .toFile(outputPath);
}

// 更新图片列表JSON文件
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

// 如果直接运行此文件
if (require.main === module) {
    generateRealisticAnimals().catch(console.error);
}

module.exports = { generateRealisticAnimals };