// Sensory Hub - Interactive JavaScript

// Background color changer
function changeBackground(color) {
    document.body.style.backgroundColor = color;
    // Add a gentle transition
    document.body.style.transition = 'background-color 0.5s ease';
}

// Drawing Canvas Setup
let canvas = null;
let ctx = null;
let isDrawing = false;
let currentColor = '#6B9BD1';

function initCanvas() {
    canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
}

function handleTouchMove(e) {
    e.preventDefault();
    if (!isDrawing) return;
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
}

function clearCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeDrawColor(color) {
    currentColor = color;
    if (ctx) {
        ctx.strokeStyle = color;
    }
}

// Counter functionality
let counter = 0;

function incrementCounter() {
    counter++;
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.textContent = counter;
        // Add a small animation
        counterElement.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counterElement.style.transform = 'scale(1)';
        }, 200);
    }
}

function resetCounter() {
    counter = 0;
    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.textContent = counter;
    }
}

// Sound functionality (placeholder - can be extended with actual audio files)
function playSound(soundType) {
    // This is a placeholder for sound functionality
    // In a real implementation, you would load and play audio files
    console.log(`Playing ${soundType} sound`);
    
    // Visual feedback
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        if (button.textContent.toLowerCase().includes(soundType)) {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 200);
        }
    });
    
    // Show a friendly message
    showMessage(`🎵 ${soundType.charAt(0).toUpperCase() + soundType.slice(1)} sound! 🎵`);
}

// Bubble functionality
function createBubbles() {
    const container = document.getElementById('bubble-container');
    if (!container) return;
    
    container.innerHTML = '';
    const colors = ['#A8D5BA', '#6B9BD1', '#F4C2C2', '#FFE5B4', '#E6E6FA', '#B8E6E6'];
    
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'color-box';
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        bubble.style.width = '60px';
        bubble.style.height = '60px';
        bubble.style.cursor = 'pointer';
        bubble.title = 'Click to pop!';
        
        bubble.addEventListener('click', function() {
            this.style.transform = 'scale(0)';
            this.style.opacity = '0';
            setTimeout(() => {
                this.remove();
            }, 300);
        });
        
        container.appendChild(bubble);
    }
}

// Message display function
function showMessage(message) {
    // Create a temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(107, 155, 209, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-size: 1.2rem;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 2000);
}

// Add CSS animation for message
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Smooth transitions for elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize canvas if present
    initCanvas();
    
    // Create initial bubbles if on stim tools page
    if (document.getElementById('bubble-container')) {
        createBubbles();
    }
    
    // Add smooth transitions to body
    document.body.style.transition = 'background-color 0.5s ease';
    
    // Add keyboard accessibility for buttons
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Announce page load for screen readers
    console.log('Sensory Hub loaded successfully! 🌈');
});

// Add gentle hover effects to cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .tool-card, .tip-card');
    cards.forEach(card => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Accessibility: Escape key to reset background
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        changeBackground('#F5F7FA');
    }
});
