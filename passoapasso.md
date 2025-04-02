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

2. Cria arquivo models.ts na pasta src e implementa as classes, interface e construtor;

3. Instala pacotes:
```bash
npm install reflect-metadata sqlite3 typeorm
```

4. Cria arquivo ormconfig.json e adiciona:

```json
{
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": ["src/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "subscribers": ["src/subscribers/**/*.ts"]
}
```    



5. Adiciona em models.ts:

```bash
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
```

6. Transforma classes em entidades do TypeORM;

    - Adicione a anotação @Entity() antes da classe e faça com que ela herde da classe base BaseEntity
    - Para cada atributo da classe, adicione a anotação @Column()
    - Para o campo id, adicione a anotação @PrimaryGeneratedColumn()

7. No arquivo index.ts, inicialize o banco de dados com:

```typescript
import { DataSource } from typeorm

const AppDataSource = new DataSource()
AppDataSource.initialize()
    .then( () => {
        // Aqui vai o seu código
        const program = new Command();
        // ...
        program.parse(process.argv)
    })
    .catch( (error) => {
        console.error(`Erro ao inicializar o banco de dados: ${error}`)
    })
```

8. O construtor da classe BaseEntity não pode ter nenhum parametro obrigatório, então atualize o construtor das classes para ficar parecido com:

```typescript
constructor(nome?: string, id?: number) {
    super()
    if (nome) this.nome = nome;
    if (id) this.id = id;
    }
```
Assim, a classe pai tem o construtor invocado e todos os argumentos serão facultativos. Na declaração dos argumentos, adicione uma ! para garntir que eles não pode ser nulos ou undefined:

```typescript
@Column()
nome!: string;
```

9. No arquivo tsconfig.json, adicione as seguintes linhas:

```json
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
```

10. Crie os métodos para executar o CRUD das classes:

```typescript
static async getById(id: number): Promise<Categoria | null> {
    return await Categoria.findOneBy( {id} )
}
```

Atualize o código, para o .action de Categoria fazer a seguinte chamada: `return Categoria.getById(argv.id)`