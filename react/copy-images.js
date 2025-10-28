const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'imagens');
const destDir = path.join(__dirname, 'public', 'imagens');

console.log('📁 Origem:', sourceDir);
console.log('📁 Destino:', destDir);
console.log('');

try {
    const files = fs.readdirSync(sourceDir);
    
    if (files.length === 0) {
        console.log('⚠️  Nenhum arquivo encontrado na pasta de origem!');
        process.exit(1);
    }
    
    console.log(`📋 Encontrados ${files.length} arquivos`);
    console.log('');
    
    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const destPath = path.join(destDir, file);
        
        fs.copyFileSync(sourcePath, destPath);
        console.log(`✅ Copiado: ${file}`);
    });
    
    console.log('');
    console.log('🎉 Todas as imagens foram copiadas com sucesso!');
    console.log('🔄 Atualize o navegador (F5) para ver as imagens.');
    
} catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
}
