const imageSrc = '../assets/IMG-20230812-WA0032.jpg'; // Path to your extracted image
const container = document.getElementById('puzzle-container');
const rows = 4, cols = 4; // Medium difficulty: 4x4 grid
const pieceSize = 300 / rows; // Dynamically calculate size based on grid

// Generate puzzle pieces
const generatePuzzle = () => {
  let positions = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positions.push({ x: col, y: row });
    }
  }

  // Shuffle positions
  positions.sort(() => Math.random() - 0.5);

  positions.forEach((pos, index) => {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.style.width = `${pieceSize}px`;
    piece.style.height = `${pieceSize}px`;
    piece.style.backgroundImage = `url(${imageSrc})`;
    piece.style.backgroundSize = `${300}px ${300}px`; // Match image size
    piece.style.backgroundPosition = `-${pos.x * pieceSize}px -${pos.y * pieceSize}px`;
    piece.dataset.index = index;

    // Drag & Drop
    piece.draggable = true;
    piece.addEventListener('dragstart', onDragStart);
    piece.addEventListener('dragover', onDragOver);
    piece.addEventListener('drop', onDrop);

    container.appendChild(piece);
  });
};

// Drag & Drop Handlers
let draggedPiece = null;

const onDragStart = (event) => {
  draggedPiece = event.target;
};

const onDragOver = (event) => {
  event.preventDefault();
};

const onDrop = (event) => {
  event.preventDefault();
  const targetPiece = event.target;

  // Swap positions
  const draggedStyle = draggedPiece.style.cssText;
  draggedPiece.style.cssText = targetPiece.style.cssText;
  targetPiece.style.cssText = draggedStyle;
};

document.getElementById('back-button').addEventListener('click', () => {
  window.history.back(); // Navigate to the previous page
});


// Initialize puzzle
generatePuzzle();
