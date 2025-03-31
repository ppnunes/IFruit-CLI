# Setup do projeto:

1. Verifica versões npm e node:
```bash
npm -v
node -v
```

2. Inicia projeto (cria package.json):
```bash
npm init
```

3. Instala dependências (pacotes baixados dentro de node_modules, cria ou atualiza package-lock.json):
```bash
npm install typescript commander @types/node
```

4. Cria arquivo tsconfig.json para configurar o TypeScript na pasta onde está o package.json. Conteúdo do arquivo:
```json
{
    //configurações
    "compilerOptions": {
        "target": "es2019", //convenção de js usada para gerar código
        "module": "commonjs", //módulo comum
        "outDir": "dist", //pasta onde os arquivos serão criados (saída)
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "forceConsistentCasingInFileNames": true
    },
    "include": ["src/**/*.ts"] //inclui todos os arquivos .ts em quaisquer pastas dentro da pasta src
}
```

5. Cria pasta src e arquivo index.ts dentro dela;

6. Compila o projeto (cria pasta dist com o projeto):

```bash
npx tsc
```

7. Para executar o programa:
```bash
node ./dist/index.js
```

# CLI

1. Em index.ts, instancia a constante program a partir da classe Command e adiciona os comandos para produto;

2. Cria arquivo models.ts na pasta src;

