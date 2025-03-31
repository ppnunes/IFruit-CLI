import { Command } from "commander";
import { Produto, Categoria } from "./models";

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
        console.log(`Categoria criada.\n${c}`) 
    })

categoria
    .command('delete')
    .description('exclui categoria')
    .option('-i, --id <id>')
    .action( (argv) => {console.log(`Categoria excluída. ${argv}`)})

categoria
    .command('read')
    .description('mostra categoria')
    .option('-i, --id <id>')
    .action( (argv) => {console.log(`Categoria:\n${argv}`)})

categoria
    .command('update')
    .description('modifica categoria')
    .option('-n, --nome <nome>')
    .option('-i, --id <id>')
    .action( (argv) => {
        const c = new Categoria(argv.nome, argv.id)
        console.log(`Categoria ${c} atualizada.\n`)
    })

categoria
    .command('list')
    .description('lista categorias')
    .action( (argv) => {console.log(`Categorias: ${argv}`)})

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
        const c = new Categoria(argv.categoria)
        const p = new Produto(argv.nome, argv.preco, c)
        console.log(`Produto criado.\n${p}`)
    })

produto
    .command('delete')
    .description('exclui produto')
    .option('-i, --id <id>')
    .action( (argv) => {console.log(`Produto excluído. ${argv}`)})

produto
    .command('read')
    .description('mostra produto')
    .option('-i, --id <id>')
    .action( (argv) => {console.log(`Produto:\n${argv}`)})

produto
    .command('update')
    .description('modifica produto')
    .option('-n, --nome <nome>')
    .option('-p, --preco <preco>')
    .option('-i, --id <id>')
    .action( (argv) => {
        const c = new Categoria(argv.categoria)
        const p = new Produto(argv.nome, argv.preco, c, argv.id)
        console.log(`Produto ${p} atualizado.\n`)
    })

produto
    .command('list')
    .description('lista produtos')
    .action( (argv) => {console.log(`Produtos: ${argv}`)})

program.parse(process.argv);    