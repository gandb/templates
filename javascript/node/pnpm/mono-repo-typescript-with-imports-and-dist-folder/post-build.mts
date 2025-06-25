import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
// Obtém o diretório raiz do projeto
const PROJECT_ROOT = process.cwd();

// Configurações
const JS_PATTERNS = ['*.js', '*.mjs', '**/*.js', '**/*.mjs'];
const PACKAGE_DIR_NAME =  'packages';
const PACKAGES_DIR = path.join(PROJECT_ROOT, 'packages');
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');

async function copyJSFiles() {
   // console.log('Iniciando cópia de arquivos JS...');

    const jsFiles = await glob(JS_PATTERNS, {
        ignore: ['node_modules/**', `${DIST_DIR}/**`]
    }); 

    for (const file of jsFiles) {
        try {
            const dest = path.join(DIST_DIR, file);
            await fs.mkdir(path.dirname(dest), { recursive: true });
            await fs.copyFile(file, dest);
            console.log(`✓ JS copiado: ${file} → ${dest}`);
        } catch (error) {
            console.error(`✗ Erro ao copiar ${file}:`, error);
        }
    }
   // console.log('Cópia de arquivos JS concluída!\n');
}

async function copyPackageModules() {
 //console.log('Iniciando cópia de node_modules...');
    const packageDirs = (await fs.readdir(PACKAGES_DIR)).filter(dir => 
        !dir.startsWith('.')
    );

    for (const pkg of packageDirs) {
        const sourceModules = path.join(PACKAGES_DIR, pkg, 'node_modules');
        const destDir = path.join(DIST_DIR, PACKAGE_DIR_NAME, pkg);
        const destModules = path.join(destDir, 'node_modules');
        
        try {
             // Substituir fs.access por lstat para verificar links simbólicos
            const stats = await fs.lstat(sourceModules).catch(() => null);
            
            if (!stats) {
                console.log(`✗ node_modules não encontrado em: ${sourceModules}`);
                continue;
            }
            
            // Remove destino existente
            try {
                await fs.rm(destModules, { recursive: true, force: true });
            } catch {}
            
            // Copia recursivamente
            await copyDir(sourceModules, destModules);
            console.log(`✓ node_modules copiado: ${sourceModules} → ${destModules}`);
        } catch (e){
            console.log(`✗ node_modules não encontrado em: ${sourceModules}`,e);
        }
    }
   // console.log('Cópia de node_modules concluída!');
}

async function copyDir(source: string, destination: string) {
    try {
        //console.log("Copiando diretório:", source, "para", destination);
        await fs.mkdir(destination, { recursive: true });
        const entries = await fs.readdir(source, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(source, entry.name);
            const destPath = path.join(destination, entry.name);

            if (entry.isSymbolicLink()) {
                //console.log(`Copiando link simbólico: ${srcPath} para ${destPath}`);
                const target = await fs.readlink(srcPath);
                await fs.symlink(target, destPath);
            } else if (entry.isDirectory()) {
                //console.log(`Copiando diretório: ${srcPath} para ${destPath}`);
                await copyDir(srcPath, destPath);
            } else {
                //console.log(`Copiando arquivo: ${srcPath} para ${destPath}`);
                await fs.copyFile(srcPath, destPath);
            }
        }
     }
    catch(e)
    {
        console.error(`Erro ao copiar diretório ${source} para ${destination}:`, e);
        throw e; // Re-throw para que o erro seja capturado no fluxo principal
    }
}

async function main() {
    try {
        await copyJSFiles();
        await copyPackageModules();
        console.log('\n✅ Todas as operações concluídas com sucesso!');
    } catch (error) {
        console.error('❌ Erro no processo principal:', error);
        process.exit(1);
    }
}

main();