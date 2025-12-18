// 拼图游戏逻辑
class PuzzleGame {
    constructor() {
        this.difficulty = 'easy'; // 默认简单模式（4块）
        this.currentPuzzle = ''; // 将在updatePuzzleSelect中设置
        this.gridCols = 2;
        this.gridRows = 2;
        this.totalCells = 4;
        this.gridConfig = { cols: 2, rows: 2 };
        this.puzzleBoard = [];
        this.puzzlePieces = [];
        this.selectedPiece = null;
        this.correctCount = 0;
        this.puzzleImageSrc = null;
        
        // 难度对应的文件夹和网格配置
        this.difficultyConfig = {
            easy: { folder: '4', cols: 2, rows: 2 },    // 4块（2x2）
            hard: { folder: '9', cols: 3, rows: 3 }     // 9块（3x3）
        };
        
        // 每个难度文件夹中的图片列表（根据实际文件添加）
        this.availableImages = {
            easy: [
                { name: '🐼 熊猫', file: 'panda_4pieces.png' },
                { name: '🖼️ 拼图1', file: 'iShot_2025-12-16_07.09.56.png' }
            ],
            medium: [
                { name: '🦒 长颈鹿', file: 'giraffe_6pieces.png' }
            ],
            hard: [
                // 可以在这里添加9块的图片
            ]
        };
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadImagesList(); // 先加载图片列表
        this.updatePuzzleSelect(); // 初始化下拉框
        this.startNewGame();
    }
    
    // 从服务器获取文件夹中的实际文件列表
    async loadImagesList() {
        try {
            // 根据难度获取对应的文件夹名称
            const folders = {
                easy: '4',
                medium: '6',
                hard: '9'
            };
            
            this.availableImages = {
                easy: [],
                medium: [],
                hard: []
            };
            
            // 遍历所有难度，获取对应的文件夹中的图片列表
            for (const [difficulty, folder] of Object.entries(folders)) {
                try {
                    const response = await fetch(`images/${folder}/`);
                    if (response.ok) {
                        const text = await response.text();
                        // 解析HTML响应，提取图片文件名称
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(text, 'text/html');
                        const files = Array.from(doc.querySelectorAll('a'))
                            .map(a => a.textContent.trim())
                            .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
                            .sort();
                        
                        // 转换为游戏需要的格式
                        this.availableImages[difficulty] = files.map(file => {
                            const name = file.split('.')[0].replace('_', ' ').replace('-', ' ');
                            return {
                                name: name,
                                file: file
                            };
                        });
                    }
                } catch (error) {
                    console.error(`获取 ${folder} 文件夹图片列表失败:`, error);
                    this.availableImages[difficulty] = [];
                }
            }
            
            this.imagesListLoaded = true;
        } catch (error) {
            console.error('加载图片列表失败:', error);
            this.imagesListLoaded = true;
        }
    }
    
    setupEventListeners() {
        const newGameBtn = document.getElementById('newGameBtn');
        const difficultySelect = document.getElementById('difficultySelect');
        const puzzleSelect = document.getElementById('puzzleSelect');
        
        newGameBtn.addEventListener('click', () => this.startNewGame());
        difficultySelect.addEventListener('change', async (e) => {
            this.difficulty = e.target.value;
            this.updateGridSize();
            if (!this.imagesListLoaded) {
                await this.loadImagesList();
            }
            this.updatePuzzleSelect(); // 更新可用的拼图选项
            this.startNewGame();
        });
        puzzleSelect.addEventListener('change', (e) => {
            this.currentPuzzle = e.target.value;
            this.startNewGame();
        });
    }
    
    updatePuzzleSelect() {
        const puzzleSelect = document.getElementById('puzzleSelect');
        const availableImages = this.availableImages[this.difficulty] || [];
        
        // 保存当前选中的值
        const currentValue = puzzleSelect.value;
        
        // 清空选项
        puzzleSelect.innerHTML = '';
        
        if (availableImages.length === 0) {
            // 如果没有可用图片，显示提示
            const option = document.createElement('option');
            option.value = '';
            option.textContent = '暂无图片，请添加图片到 images/' + this.difficultyConfig[this.difficulty].folder + ' 文件夹';
            puzzleSelect.appendChild(option);
            this.currentPuzzle = '';
            return;
        }
        
        // 添加当前难度可用的选项
        let selectedIndex = 0;
        availableImages.forEach((img, index) => {
            const option = document.createElement('option');
            option.value = img.file;
            option.textContent = img.name;
            if (img.file === currentValue || (index === 0 && !availableImages.find(img => img.file === currentValue))) {
                option.selected = true;
                selectedIndex = index;
            }
            puzzleSelect.appendChild(option);
        });
        
        this.currentPuzzle = availableImages[selectedIndex].file;
    }
    
    updateGridSize() {
        // 从难度配置获取网格大小
        const config = this.difficultyConfig[this.difficulty];
        this.gridCols = config.cols;
        this.gridRows = config.rows;
        this.totalCells = this.gridCols * this.gridRows;
        this.difficultyFolder = config.folder; // 保存文件夹名称
    }
    
    async startNewGame() {
        this.updateGridSize();
        this.correctCount = 0;
        this.selectedPiece = null;
        
        // 获取当前选择的图片文件名
        const puzzleSelect = document.getElementById('puzzleSelect');
        const selectedFile = puzzleSelect.value || this.currentPuzzle;
        
        if (!selectedFile) {
            this.displayMessage('⚠️ 请先添加图片到 images/' + this.difficultyFolder + ' 文件夹');
            return;
        }
        
        // 根据难度从对应文件夹加载图片
        this.puzzleImageSrc = `images/${this.difficultyFolder}/${selectedFile}`;
        this.currentPuzzle = selectedFile;
        
        // 等待图片加载并获取实际尺寸
        await this.loadImage();
        this.generatePuzzle();
        this.displayMessage('开始拼图吧！点击拼图块放到正确的位置 🎮');
    }
    
    loadImage() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                // 保存图片的原始尺寸
                this.imageWidth = img.width;
                this.imageHeight = img.height;
                resolve();
            };
            img.onerror = () => {
                console.error(`无法加载图片: ${this.puzzleImageSrc}`);
                // 如果图片加载失败，使用默认尺寸，并显示提示
                this.imageWidth = 400;
                this.imageHeight = 400;
                this.displayMessage(`⚠️ 图片 ${this.puzzleImageSrc} 加载失败，请检查文件是否存在`);
                resolve(); // 仍然继续，避免游戏无法开始
            };
            img.src = this.puzzleImageSrc;
        });
    }
    
    generatePuzzle() {
        // 根据难度设置每个格子大小
        let pieceWidth, pieceHeight, imageSize;
        if (this.difficulty === 'easy') {
            // 4块拼图：每个格子200*200
            pieceWidth = 200;
            pieceHeight = 200;
            imageSize = 400; // 2*200
        } else {
            // 9块拼图：每个格子300*300
            pieceWidth = 300;
            pieceHeight = 300;
            imageSize = 900; // 3*300
        }
        
        this.imageWidth = imageSize;
        this.imageHeight = imageSize;
        
        // 创建正确答案数组
        this.puzzleBoard = [];
        for (let i = 0; i < this.totalCells; i++) {
            const row = Math.floor(i / this.gridCols);
            const col = i % this.gridCols;
            this.puzzleBoard.push({
                id: i,
                correctId: i,
                isFilled: false,
                row: row,
                col: col,
                backgroundX: -col * pieceWidth,
                backgroundY: -row * pieceHeight,
                pieceWidth: pieceWidth,
                pieceHeight: pieceHeight
            });
        }
        
        // 创建打乱的拼图块数组
        this.puzzlePieces = [...this.puzzleBoard].sort(() => Math.random() - 0.5);
        
        this.render();
    }
    
    render() {
        this.renderBoard();
        this.renderPieces();
    }
    
    renderBoard() {
        const board = document.getElementById('puzzleBoard');
        board.innerHTML = '';
        
        // 根据cell的尺寸设置网格模板，使用固定像素值
        const pieceWidth = this.puzzleBoard[0].pieceWidth;
        const pieceHeight = this.puzzleBoard[0].pieceHeight;
        board.style.gridTemplateColumns = `repeat(${this.gridCols}, ${pieceWidth}px)`;
        board.style.gridTemplateRows = `repeat(${this.gridRows}, ${pieceHeight}px)`;
        
        this.puzzleBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.className = 'puzzle-cell';
            cellElement.dataset.index = index;
            
            // 根据计算出的尺寸设置每个格子的大小
            cellElement.style.width = `${cell.pieceWidth}px`;
            cellElement.style.height = `${cell.pieceHeight}px`;
            
            if (cell.isFilled && cell.pieceId !== undefined) {
                cellElement.classList.add('filled', 'correct');
                const piece = this.puzzlePieces.find(p => p.id === cell.pieceId);
                if (piece) {
                    // 显示拼图块的图片部分
                    cellElement.style.backgroundImage = `url(${this.puzzleImageSrc})`;
                    cellElement.style.backgroundSize = `${this.imageWidth}px ${this.imageHeight}px`;
                    cellElement.style.backgroundPosition = `${piece.backgroundX}px ${piece.backgroundY}px`;
                    cellElement.style.backgroundRepeat = 'no-repeat';
                }
            }
            
            cellElement.addEventListener('click', () => this.handleCellClick(index));
            board.appendChild(cellElement);
        });
    }
    
    renderPieces() {
        const piecesContainer = document.getElementById('puzzlePieces');
        piecesContainer.innerHTML = '';
        
        // 根据piece的尺寸设置网格模板，使用固定像素值
        const pieceWidth = this.puzzlePieces[0]?.pieceWidth || 200;
        const pieceHeight = this.puzzlePieces[0]?.pieceHeight || 200;
        
        // 计算拼图块区域的网格大小（使用列数）
        const cols = Math.ceil(Math.sqrt(this.puzzlePieces.length));
        piecesContainer.style.gridTemplateColumns = `repeat(${cols}, ${pieceWidth}px)`;
        piecesContainer.style.gridTemplateRows = `repeat(auto-fill, ${pieceHeight}px)`;
        
        this.puzzlePieces.forEach((piece, index) => {
            // 检查这个拼图块是否已经被使用
            const isUsed = this.puzzleBoard.some(cell => 
                cell.isFilled && cell.pieceId === piece.id
            );
            
            if (!isUsed) {
                const pieceElement = document.createElement('div');
                pieceElement.className = 'puzzle-piece';
                if (this.selectedPiece && this.selectedPiece.id === piece.id) {
                    pieceElement.classList.add('selected');
                }
                
                // 根据计算出的尺寸设置每个拼图块的大小
                pieceElement.style.width = `${piece.pieceWidth}px`;
                pieceElement.style.height = `${piece.pieceHeight}px`;
                
                // 显示拼图块的图片部分
                pieceElement.style.backgroundImage = `url(${this.puzzleImageSrc})`;
                pieceElement.style.backgroundSize = `${this.imageWidth}px ${this.imageHeight}px`;
                pieceElement.style.backgroundPosition = `${piece.backgroundX}px ${piece.backgroundY}px`;
                pieceElement.style.backgroundRepeat = 'no-repeat';
                
                pieceElement.dataset.pieceId = piece.id;
                
                pieceElement.addEventListener('click', () => this.handlePieceClick(piece));
                piecesContainer.appendChild(pieceElement);
            }
        });
    }
    
    handlePieceClick(piece) {
        this.selectedPiece = piece;
        this.displayMessage('现在点击拼图板上的位置来放置拼图块！');
        this.renderPieces(); // 重新渲染以显示选中状态
    }
    
    handleCellClick(cellIndex) {
        if (!this.selectedPiece) {
            this.displayMessage('请先选择一个拼图块！');
            return;
        }
        
        const cell = this.puzzleBoard[cellIndex];
        
        // 如果这个位置已经有拼图块了，先清除
        if (cell.isFilled) {
            this.removePieceFromCell(cellIndex);
        }
        
        // 放置拼图块
        this.placePiece(cellIndex, this.selectedPiece);
    }
    
    placePiece(cellIndex, piece) {
        const cell = this.puzzleBoard[cellIndex];
        const isCorrect = cell.correctId === piece.id;
        
        // 如果这个位置之前有正确的拼图块，需要减少计数
        const wasCorrect = cell.isFilled && cell.pieceId === cell.correctId;
        if (wasCorrect) {
            this.correctCount--;
        }
        
        cell.isFilled = true;
        cell.pieceId = piece.id;
        
        if (isCorrect) {
            this.correctCount++;
            this.displayMessage(`太棒了！🎉 正确！你已经完成了 ${this.correctCount}/${this.puzzleBoard.length} 块！`);
            
            // 添加成功动画
            setTimeout(() => {
                this.checkWin();
            }, 500);
        } else {
            this.displayMessage('位置不对，再试试看！💪');
            // 延迟后移除错误的拼图块
            setTimeout(() => {
                this.removePieceFromCell(cellIndex);
                this.render();
            }, 1000);
        }
        
        this.selectedPiece = null;
        this.render();
    }
    
    removePieceFromCell(cellIndex) {
        const cell = this.puzzleBoard[cellIndex];
        cell.isFilled = false;
        delete cell.pieceId;
    }
    
    checkWin() {
        if (this.correctCount === this.puzzleBoard.length) {
            this.displayMessage('🎊 恭喜你！拼图完成了！你太厉害了！🎊', true);
            // 添加庆祝动画
            this.celebrate();
        }
    }
    
    celebrate() {
        const board = document.getElementById('puzzleBoard');
        board.style.animation = 'bounce 1s ease 3';
        
        // 创建彩纸效果（简化版）
        setTimeout(() => {
            this.displayMessage('再玩一次吧！点击"新游戏"按钮 🎮');
        }, 3000);
    }
    
    displayMessage(text, isSuccess = false) {
        const messageEl = document.getElementById('message');
        messageEl.textContent = text;
        messageEl.className = isSuccess ? 'message success' : 'message';
        
        if (isSuccess) {
            setTimeout(() => {
                messageEl.classList.remove('success');
            }, 3000);
        }
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    new PuzzleGame();
});
