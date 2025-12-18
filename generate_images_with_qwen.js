// 用于生成真实动物图片的脚本（Node.js环境）
// 使用千问大模型生成图片

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 确保目录存在
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 调用千问大模型生成图片
async function generateImageWithQwen(prompt, width, height, outputPath) {
    console.log(`正在调用千问大模型生成图片: ${prompt}`);
    
    // 千问大模型API调用（请替换为实际的API密钥和端点）
    // 这里使用的是示例格式，需要根据实际情况调整
    const QWEN_API_KEY = process.env.QWEN_API_KEY || '';
    if (!QWEN_API_KEY) {
        throw new Error('请设置QWEN_API_KEY环境变量');
    }
    
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${QWEN_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'qwen-vl-plus',
            input: {
                prompt: prompt
            },
            parameters: {
                width: width,
                height: height,
                n: 1
            }
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`调用千问大模型失败: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }
    
    const data = await response.json();
    
    // 解析生成的图片URL
    if (!data.output || !data.output.results || data.output.results.length === 0) {
        throw new Error('千问大模型未返回有效的图片结果');
    }
    
    const imageUrl = data.output.results[0].url;
    console.log(`✓ 千问大模型生成图片成功: ${imageUrl}`);
    
    // 下载并保存图片
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
        throw new Error(`下载生成的图片失败: ${imageResponse.status} ${imageResponse.statusText}`);
    }
    
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // 使用sharp调整图片大小并保存
    await sharp(buffer)
        .resize(width, height, {
            fit: 'cover',
            position: 'center'
        })
        .png()
        .toFile(outputPath);
    
    console.log(`✓ 保存图片成功: ${outputPath}`);
    return outputPath;
}

// 生成真实的动物图片
async function generateRealisticAnimals() {
    console.log('开始使用千问大模型生成真实的动物图片...');
    
    // 确保目标目录存在
    ensureDir('images/4');
    ensureDir('images/6');
    ensureDir('images/9');
    
    // 定义动物和对应的提示词
    const animals = [
        {
            name: '狮子',
            prompt: '一只真实的狮子，高清照片，自然环境，生动逼真，色彩鲜艳',
            filenames: ['lion_qwen_4pieces.png', 'lion_qwen_6pieces.png', 'lion_qwen_9pieces.png']
        },
        {
            name: '大象',
            prompt: '一只真实的大象，高清照片，非洲草原，生动逼真，色彩鲜艳',
            filenames: ['elephant_qwen_4pieces.png', 'elephant_qwen_6pieces.png', 'elephant_qwen_9pieces.png']
        },
        {
            name: '熊猫',
            prompt: '一只真实的熊猫，高清照片，中国竹林，生动逼真，色彩鲜艳',
            filenames: ['panda_qwen_4pieces.png', 'panda_qwen_6pieces.png', 'panda_qwen_9pieces.png']
        }
    ];
    
    // 定义不同拼图块数对应的尺寸
    const sizes = [
        { pieces: 4, width: 400, height: 400 },
        { pieces: 6, width: 600, height: 400 },
        { pieces: 9, width: 600, height: 600 }
    ];
    
    // 生成每种动物的图片
    for (const animal of animals) {
        console.log(`\n正在处理${animal.name}图片...`);
        
        for (let i = 0; i < sizes.length; i++) {
            const size = sizes[i];
            const filename = animal.filenames[i];
            const outputPath = path.join('images', `${size.pieces}`, filename);
            
            try {
                await generateImageWithQwen(animal.prompt, size.width, size.height, outputPath);
                console.log(`✓ 生成 ${size.pieces}块拼图图片: ${outputPath}`);
            } catch (error) {
                console.error(`✗ 处理${animal.name}${size.pieces}块图片时出错:`, error.message);
                // 生成失败直接失败，不再生成占位符
                throw error;
            }
        }
    }
    
    console.log('\n✅ 所有真实动物图片生成完成！');
    
    // 更新图片列表
    updateImagesList();
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
