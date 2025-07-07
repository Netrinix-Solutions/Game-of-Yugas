// Game State
const gameState = {
    currentYuga: "kali",
    mantrasRecovered: 0,
    totalMantras: 12,
    powers: {
        trinetra: { charges: 3, description: "Reveal hidden code paths" },
        sudarshan: { charges: 1, description: "Break infinite loops" },
        firewallBuster: { charges: 1, description: "Bypass security walls" }
    },
    puzzles: {
        kali: [
            {
                cmd: "scan --network",
                response: "Network scan complete. Malicious nodes detected.",
                nextCmd: "bypass --firewall",
                solution: "decrypt --key=dharma",
                success: "Firewall breached! Mantra fragment recovered.",
                hint: "The ancient key is 'dharma'"
            },
            {
                cmd: "purify --ai-asura",
                solution: "invoke --mantra=om",
                success: "AI Asura defeated! Mantra fragment recovered.",
                hint: "The primal sound 'om' has power here"
            }
        ],
        dvapara: [
            {
                cmd: "analyze --blockchain",
                solution: "crack --algorithm=vedic",
                success: "Blockchain shattered! Mantra fragment recovered.",
                hint: "Vedic algorithms predate modern cryptography"
            }
        ],
        treta: [
            {
                cmd: "infiltrate --lanka",
                solution: "stealth --mode=vanara",
                success: "Cyber Lanka infiltrated! Mantra fragment recovered.",
                hint: "The vanara approach avoids detection"
            }
        ],
        satya: [
            {
                cmd: "align --dharma",
                solution: "balance --elements=5",
                success: "Dharma Protocol aligned! Final mantra recovered.",
                hint: "The pancha bhutas must be balanced"
            }
        ]
    },
    currentPuzzle: 0,
    waitingForSolution: false
};

// DOM Elements
const terminalOutput = document.getElementById('terminal-output');
const commandInput = document.getElementById('command-input');
const yugaDisplay = document.getElementById('yuga-display');
const mantraCount = document.getElementById('mantra-count');
const progressBar = document.getElementById('progress-bar');
const trinetraPower = document.getElementById('trinetra-power');
const sudarshanPower = document.getElementById('sudarshan-power');
const firewallPower = document.getElementById('firewall-power');
const introModal = document.getElementById('intro-modal');
const startButton = document.getElementById('start-game');
const bgMusic = document.getElementById('bg-music');
const successSound = document.getElementById('success-sound');
const powerSound = document.getElementById('power-sound');

// Initialize game
function initGame() {
    // Set up event listeners
    commandInput.addEventListener('keydown', handleCommand);
    startButton.addEventListener('click', startGame);
    trinetraPower.addEventListener('click', () => usePower('trinetra'));
    sudarshanPower.addEventListener('click', () => usePower('sudarshan'));
    firewallPower.addEventListener('click', () => usePower('firewallBuster'));
    
    // Update power displays
    updatePowerDisplays();
    
    // Show intro modal
    introModal.style.display = 'flex';
    
    // Try to play background music (may be blocked by browser)
    bgMusic.volume = 0.3;
    bgMusic.play().catch(e => console.log("Audio playback blocked:", e));
}

// Start the game
function startGame() {
    introModal.style.display = 'none';
    printToTerminal("Initializing cyber-sage interface...", "system");
    setTimeout(() => {
        printToTerminal("Connecting to Kali Yuga network...", "system");
        setTimeout(() => {
            printToTerminal("> WARNING: Kali Asura's firewalls detected", "system");
            printToTerminal("Type 'help' for available commands", "system");
            startYuga(gameState.currentYuga);
        }, 1000);
    }, 1000);
}

// Handle terminal commands
function handleCommand(e) {
    if (e.key === 'Enter') {
        const command = commandInput.value.trim();
        commandInput.value = '';
        
        // Print the command to terminal
        printToTerminal(`> ${command}`, "command");
        
        // Process the command
        processCommand(command);
        
        // Auto-scroll terminal
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
}

// Process commands
function processCommand(command) {
    // Help command
    if (command === 'help') {
        printToTerminal("Available commands:", "system");
        printToTerminal("- scan: Analyze the network", "system");
        printToTerminal("- bypass: Attempt to circumvent defenses", "system");
        printToTerminal("- purify: Cleanse corrupted systems", "system");
        printToTerminal("- invoke: Use sacred mantras", "system");
        printToTerminal("- hint: Get guidance", "system");
        printToTerminal("- use-power: Activate divine abilities", "system");
        return;
    }
    
    // Hint command
    if (command === 'hint') {
        const puzzles = gameState.puzzles[gameState.currentYuga];
        if (puzzles && puzzles[gameState.currentPuzzle]) {
            printToTerminal(`Hint: ${puzzles[gameState.currentPuzzle].hint}`, "system");
        } else {
            printToTerminal("No hints available at this stage", "error");
        }
        return;
    }
    
    // Use power command
    if (command.startsWith('use-power')) {
        const power = command.split(' ')[1];
        if (power) {
            usePower(power);
        } else {
            printToTerminal("Specify a power: trinetra, sudarshan, or firewallBuster", "error");
        }
        return;
    }
    
    // Check if we're waiting for a solution
    const puzzles = gameState.puzzles[gameState.currentYuga];
    if (puzzles && gameState.currentPuzzle < puzzles.length) {
        const puzzle = puzzles[gameState.currentPuzzle];
        
        // Check if this is the solution
        if (command === puzzle.solution) {
            // Success!
            printToTerminal(puzzle.success, "success");
            successSound.play();
            
            // Recover mantra
            gameState.mantrasRecovered++;
            updateProgress();
            
            // Move to next puzzle or yuga
            gameState.currentPuzzle++;
            if (gameState.currentPuzzle >= puzzles.length) {
                advanceToNextYuga();
            } else {
                // Print next command prompt
                const nextPuzzle = puzzles[gameState.currentPuzzle];
                printToTerminal(nextPuzzle.cmd, "system");
            }
        } else {
            // Wrong command
            printToTerminal("Command failed. Try 'hint' for guidance.", "error");
        }
    } else {
        // No active puzzle
        printToTerminal("Command not recognized. Type 'help' for options.", "error");
    }
}

// Start a new Yuga
function startYuga(yuga) {
    gameState.currentYuga = yuga;
    gameState.currentPuzzle = 0;
    
    // Update display
    yugaDisplay.textContent = `${yuga.toUpperCase()} YUGA`;
    yugaDisplay.style.color = getYugaColor(yuga);
    yugaDisplay.style.textShadow = `0 0 10px ${getYugaColor(yuga)}`;
    
    // Set prompt color
    document.getElementById('prompt').style.color = getYugaColor(yuga);
    
    // Start first puzzle
    const puzzles = gameState.puzzles[yuga];
    if (puzzles && puzzles.length > 0) {
        printToTerminal(puzzles[0].cmd, "system");
    }
}

// Advance to next Yuga
function advanceToNextYuga() {
    const yugas = ["kali", "dvapara", "treta", "satya"];
    const currentIndex = yugas.indexOf(gameState.currentYuga);
    
    if (currentIndex < yugas.length - 1) {
        const nextYuga = yugas[currentIndex + 1];
        printToTerminal(`Preparing transition to ${nextYuga} yuga...`, "system");
        
        // Animation effect
        document.body.classList.add('yuga-transition');
        setTimeout(() => {
            document.body.classList.remove('yuga-transition');
            startYuga(nextYuga);
        }, 2000);
    } else {
        // Game completed
        printToTerminal("ALL MANTRAS RECOVERED!", "success");
        printToTerminal("The Dharma Protocol is restored. Cosmic balance returns.", "system");
        printToTerminal("Thank you for playing Code of the Gods: Hack the Yugas!", "system");
    }
}

// Use a power-up
function usePower(power) {
    if (gameState.powers[power].charges > 0) {
        gameState.powers[power].charges--;
        updatePowerDisplays();
        
        // Play sound
        powerSound.play();
        
        // Visual effect
        const powerElement = document.getElementById(`${power}-power`);
        powerElement.classList.add(`${power}-active`);
        setTimeout(() => {
            powerElement.classList.remove(`${power}-active`);
        }, 1000);
        
        // Power effects
        let message = "";
        switch (power) {
            case 'trinetra':
                message = "TRINETRA ACTIVATED: Hidden code paths revealed!";
                break;
            case 'sudarshan':
                message = "SUDARSHAN CHAKRA: Logic loops shattered!";
                break;
            case 'firewallBuster':
                message = "FIREWALL BUSTER: Security barriers bypassed!";
                break;
        }
        printToTerminal(message, "success");
    } else {
        printToTerminal(`${power.toUpperCase()} power depleted!`, "error");
    }
}

// Update power displays
function updatePowerDisplays() {
    trinetraPower.querySelector('.power-count').textContent = gameState.powers.trinetra.charges;
    sudarshanPower.querySelector('.power-count').textContent = gameState.powers.sudarshan.charges;
    firewallPower.querySelector('.power-count').textContent = gameState.powers.firewallBuster.charges;
}

// Update progress display
function updateProgress() {
    mantraCount.textContent = gameState.mantrasRecovered;
    const progress = (gameState.mantrasRecovered / gameState.totalMantras) * 100;
    progressBar.style.width = `${progress}%`;
}

// Print to terminal
function printToTerminal(text, type = "response") {
    const div = document.createElement('div');
    div.className = type;
    div.textContent = text;
    terminalOutput.appendChild(div);
}

// Get color for current Yuga
function getYugaColor(yuga) {
    switch (yuga) {
        case 'kali': return '#ff3366';
        case 'dvapara': return '#33ffcc';
        case 'treta': return '#ffcc33';
        case 'satya': return '#ffffff';
        default: return '#00ffaa';
    }
}

// Initialize the game when loaded
document.addEventListener('DOMContentLoaded', initGame);