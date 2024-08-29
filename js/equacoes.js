function solveFirstDegree() {
    const a = parseFloat(document.getElementById('coef-a1').value);
    const b = parseFloat(document.getElementById('coef-b1').value);

    if (isNaN(a) || isNaN(b)) {
        displaySolution('solution-1st-degree', 'Por favor, insira valores válidos.');
        return;
    }

    const x = -b / a;
    displaySolution('solution-1st-degree', `A solução é x = ${x}`);
}

function solveSecondDegree() {
    const a = parseFloat(document.getElementById('coef-a2').value);
    const b = parseFloat(document.getElementById('coef-b2').value);
    const c = parseFloat(document.getElementById('coef-c2').value);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        displaySolution('solution-2nd-degree', 'Por favor, insira valores válidos.');
        return;
    }

    const delta = b * b - 4 * a * c;

    if (delta < 0) {
        displaySolution('solution-2nd-degree', 'A equação não possui raízes reais.');
    } else {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        displaySolution('solution-2nd-degree', `As soluções são x₁ = ${x1} e x₂ = ${x2}`);

        // Gerar gráfico
        plotQuadraticEquation(a, b, c);
    }
}

function plotQuadraticEquation(a, b, c) {
    const canvas = document.getElementById('equation-graph');
    const ctx = canvas.getContext('2d');
    
    const width = canvas.width;
    const height = canvas.height;

    // Limpar o gráfico anterior
    ctx.clearRect(0, 0, width, height);

    // Desenhar papel milimetrado
    ctx.strokeStyle = '#00A7E2'; // Cor das linhas do papel milimetrado
    ctx.lineWidth = 0.5;

    // Linhas verticais
    for (let x = 0; x <= width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }

    // Linhas horizontais
    for (let y = 0; y <= height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }

    // Desenhar os eixos X e Y
    ctx.strokeStyle = '#000000'; // Cor dos eixos
    ctx.lineWidth = 2;

    // Eixo Y
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Eixo X
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    // Adicionar marcações e valores nos eixos X e Y
    ctx.font = '12px Arial';
    ctx.fillStyle = '#000000';

    // Marcação e valores no eixo X
    for (let x = -10; x <= 10; x++) {
        const canvasX = width / 2 + x * 20;
        ctx.beginPath();
        ctx.moveTo(canvasX, height / 2 - 5); // Marcação para cima do eixo
        ctx.lineTo(canvasX, height / 2 + 5); // Marcação para baixo do eixo
        ctx.stroke();
        if (x !== 0) { // Evita desenhar o zero no meio
            ctx.fillText(x, canvasX - 3, height / 2 + 20); // Valores abaixo da marcação
        }
    }

    // Marcação e valores no eixo Y
    for (let y = -10; y <= 10; y++) {
        const canvasY = height / 2 - y * 20;
        ctx.beginPath();
        ctx.moveTo(width / 2 - 5, canvasY); // Marcação para a esquerda do eixo
        ctx.lineTo(width / 2 + 5, canvasY); // Marcação para a direita do eixo
        ctx.stroke();
        if (y !== 0) { // Evita desenhar o zero no meio
            ctx.fillText(y, width / 2 + 10, canvasY + 3); // Valores ao lado da marcação
        }
    }

    // Configurar estilo para o gráfico
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;

    // Plotar a equação quadrática
    ctx.beginPath();
    let started = false;
    for (let x = -10; x <= 10; x += 0.1) {
        const y = a * x * x + b * x + c;
        const canvasX = width / 2 + x * 20; // Escala de 20 pixels por unidade
        const canvasY = height / 2 - y * 20; // Escala de 20 pixels por unidade

        if (!started) {
            ctx.moveTo(canvasX, canvasY);
            started = true;
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }
    ctx.stroke();
}

function displaySolution(elementId, solution) {
    const element = document.getElementById(elementId);
    element.innerText = solution;
    element.style.marginTop = '20px';
    element.style.padding = '10px';
    element.style.backgroundColor = '#fff';
    element.style.borderRadius = '5px';
    element.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
}
