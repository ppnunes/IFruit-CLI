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

export class Categoria implements ICategoria {
    id?: number;
    nome: string;

    constructor(nome: string, id?: number) {
        this.nome = nome;
        this.id = id;
    }

    toString():string {
        return `Categoria: ${this.nome}`
    }
}

export class Produto implements IProduto{
    id?: number;
    nome: string;
    preco: number;
    categoria: ICategoria;

    constructor(nome: string, preco: number, categoria: ICategoria, id?: number ){
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
    }

    toString():string {
        return `Produto: ${this.nome} Preço: R$ ${this.preco} ${this.categoria}`
    }
    
}
