document.addEventListener('DOMContentLoaded', () => {
    const fileInput1 = document.getElementById('file1');
    const fileInput2 = document.getElementById('file2');
    const fileName1 = document.getElementById('fileName1');
    const fileName2 = document.getElementById('fileName2');
    const compareBtn = document.getElementById('compareBtn');
    const resultSection = document.getElementById('resultSection');

    let file1Data = null;
    let file2Data = null;

    // Handle file selection
    const handleFileSelect = (input, nameDisplay, fileNum) => {
        if (input.files.length > 0) {
            const file = input.files[0];
            nameDisplay.textContent = file.name;
            nameDisplay.style.color = '#f8fafc'; // primary text
            
            if (fileNum === 1) file1Data = file;
            else file2Data = file;
        } else {
            nameDisplay.textContent = 'Ningún archivo seleccionado';
            nameDisplay.style.color = '#94a3b8';
            if (fileNum === 1) file1Data = null;
            else file2Data = null;
        }
        
        checkReady();
    };

    fileInput1.addEventListener('change', () => handleFileSelect(fileInput1, fileName1, 1));
    fileInput2.addEventListener('change', () => handleFileSelect(fileInput2, fileName2, 2));

    // Drag and drop visual feedback
    const setupDragAndDrop = (dropzoneId, inputElement) => {
        const dropzone = document.getElementById(dropzoneId);
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, () => {
                dropzone.classList.remove('dragover');
            }, false);
        });
    };

    setupDragAndDrop('dropzone1', fileInput1);
    setupDragAndDrop('dropzone2', fileInput2);

    const checkReady = () => {
        if (file1Data && file2Data) {
            compareBtn.disabled = false;
        } else {
            compareBtn.disabled = true;
        }
    };

    // Clean filename function
    const extractHash = (filename) => {
        // Remove .pdf extension (case insensitive)
        let name = filename.replace(/\.pdf$/i, '');
        // Remove " (1)", " (2)" etc at the end. Regex looks for space, open paren, digits, close paren at string end
        name = name.replace(/\s*\(\d+\)$/, '');
        // Trim any extra whitespace
        return name.trim();
    };

    // Format bytes
    const formatBytes = (bytes, decimals = 2) => {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    };

    compareBtn.addEventListener('click', () => {
        if (!file1Data || !file2Data) return;

        const hash1 = extractHash(file1Data.name);
        const hash2 = extractHash(file2Data.name);

        resultSection.classList.remove('hidden', 'match', 'mismatch');
        
        // Force reflow for animation restart
        void resultSection.offsetWidth;

        if (hash1 === hash2) {
            resultSection.classList.add('match');
            resultSection.innerHTML = `
                <div class="result-icon">✨</div>
                <h2 class="result-title">¡Los archivos son idénticos!</h2>
                <div class="result-details">
                    <p><strong>Hash detectado:</strong><br>${hash1}</p>
                    <p style="margin-top: 1rem; color: #10b981;">Ambos archivos comparten el mismo identificador base, ignorando copias como (1).</p>
                </div>
            `;
        } else {
            resultSection.classList.add('mismatch');
            resultSection.innerHTML = `
                <div class="result-icon">⚠️</div>
                <h2 class="result-title">Los archivos son diferentes</h2>
                <div class="result-details">
                    <p style="margin-bottom: 1rem; color: #ef4444; font-weight: bold;">Reporte de Diferencias:</p>
                    
                    <p><strong>Archivo 1:</strong><br>
                    Nombre original: ${file1Data.name}<br>
                    Hash extraído: <span style="color: #f8fafc">${hash1}</span><br>
                    Tamaño: ${formatBytes(file1Data.size)}</p>
                    
                    <p style="margin-top: 1rem;"><strong>Archivo 2:</strong><br>
                    Nombre original: ${file2Data.name}<br>
                    Hash extraído: <span style="color: #f8fafc">${hash2}</span><br>
                    Tamaño: ${formatBytes(file2Data.size)}</p>
                </div>
            `;
        }
    });
});
