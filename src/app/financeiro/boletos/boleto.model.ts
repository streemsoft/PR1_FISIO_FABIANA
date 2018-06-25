export class Boleto{
    key:string;
    desc:string;
    venci:string;
    url:string;
    valor:string;
    situacao:string;

    constructor(){
        this.desc = '';
        this.key = '';
        this.situacao = '';
        this.url = '';
        this.valor = '';
        this.venci = '';
    }
}