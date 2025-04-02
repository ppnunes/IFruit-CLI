import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";

interface ICategoria {
    id?: number;
    nome: string;
}

interface IProduto {
    id?: number;
    nome: string;
    preco: number;
    categoria: ICategoria;
}

@Entity()
export class Categoria extends BaseEntity implements ICategoria {
    
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column( {nullable: false} )
    nome!: string;

    constructor(nome?: string, id?: number) {
        super()
        if (nome) this.nome = nome;
        if (id) this.id = id;
    }

    toString():string {
        return `Categoria: ${this.nome}`
    }
}

@Entity()
export class Produto extends BaseEntity implements IProduto{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome!: string;

    @Column()
    preco!: number;

    @ManyToOne(() => Categoria, { eager: true }) // Relacionamento Many-to-One com Categoria
    @JoinColumn() // Indica que esta coluna é uma FK
    categoria!: ICategoria;

    constructor(nome?: string, preco?: number, categoria?: ICategoria, id?: number) {
        super()
        if (nome) this.nome = nome;
        if (preco) this.preco = preco;
        if (categoria) this.categoria = categoria;
        if (id) this.id = id;
        }

    toString():string {
        return `Produto: ${this.nome} Preço: R$ ${this.preco} ${this.categoria}`
    }
    
}
