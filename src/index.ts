import { Command } from "commander";
import { Produto, Categoria } from "./models";
import { DataSource } from "typeorm";
import { error } from "console";

const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [Categoria, Produto],
})
AppDataSource.initialize()
    .then( () => {
        
        const program = new Command();
        program
            .name("IFruit")
            .description("CLI para gerenciamento de produtos e categorias.")

        const categoria = program.command('categoria')
        categoria.description('Ações relacionadas a categoria') 
        categoria
            .command('create')
            .description('cria categoria')
            .option('-n, --nome <nome>')
            .option('-i, --id [id]')
            .action( (argv) => {
                const c = new Categoria(argv.nome)
                c.save()
                console.log(`Categoria criada.\n${c}`) 
            })

        categoria
            .command('delete')
            .description('exclui categoria')
            .option('-i, --id <id>')
            .action( (argv) => {
                Categoria.delete({id: argv.id})
                console.log(`Categoria excluída. ${argv}`)
            })

        categoria
            .command('read')
            .description('mostra categoria')
            .option('-i, --id <id>')
            .action( (argv) => {
                Categoria.findOneBy({id: argv.id})
                    .then( (c) => {
                        console.log(`Categoria:\n${c}`)
                    }
                    ) 
            })

        categoria
            .command('update')
            .description('modifica categoria')
            .option('-n, --nome <nome>')
            .option('-i, --id <id>')
            .action( (argv) => {
                const c = new Categoria(argv.nome, argv.id)
                c.save()
                console.log(`Categoria ${c} atualizada.\n`)
            })

        categoria
            .command('list')
            .description('lista categorias')
            .action( (argv) => {
                Categoria.find().then((c) => {
                    console.table(c)
                })
                
            })

        const produto = program.command('produto')
        produto.description("Ações relacionadas a produto")
        produto
            .command('create')
            .description('cria produto')
            .option('-n, --nome <nome>')
            .option('-p, --preco <preco>')
            .option('-c, --categoria <categoria>')
            .option('-i, --id [id]')
            .action( (argv) => {
                Categoria.findOneByOrFail({nome: argv.categoria}).then((c) => {
                    const p = new Produto(argv.nome, argv.preco, c)
                    p.save()
                    console.log(`Produto criado.\n${p}`)
                }).catch((error) => {console.log(`Erro: Não foi possível encontrar a categoria.${error}`)})
                
                
            })

        produto
            .command('delete')
            .description('exclui produto')
            .option('-i, --id <id>')
            .action( (argv) => {
                Produto.delete({id: argv.id})
                console.log(`Produto excluído. ${argv}`)
            })

        produto
            .command('read')
            .description('mostra produto')
            .option('-i, --id <id>')
            .action( (argv) => {
                Produto.findOneBy({id: argv.id}).then((p) => {
                    console.log(`Produto:\n${p}`)
                })     
            })

        produto
            .command('update')
            .description('modifica produto')
            .option('-n, --nome <nome>')
            .option('-p, --preco <preco>')
            .option('-i, --id <id>')
            .action( (argv) => {
                Categoria.findOneByOrFail({nome: argv.categoria}).then((c) => {
                    const p = new Produto(argv.nome, argv.preco, c)
                    p.save()
                    console.log(`Produto atualizado.\n${p}`)
                }).catch((error) => {console.log(`Erro: Não foi possível encontrar a categoria.${error}`)}) 
                
            })

        produto
            .command('list')
            .description('lista produtos')
            .action( (argv) => {
                Produto.find().then((c) => {
                    console.table(c)
                })
            })

        program.parse(process.argv);    
    })
    .catch( (error) => {
        console.error(`Erro ao inicializar o banco de dados: ${error}`)
    })