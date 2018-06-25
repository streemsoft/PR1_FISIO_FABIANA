export class Fatura{
    key:string;
    key_cliente:string;
    dt_criada:string;
    vl_total:string;
    vl_pago:string;
    status:string;
    origem:string;

    constructor(){
        this.key = '';
        this.key_cliente = '';
        this.origem = '';
        this.status = '';
        this.vl_pago = '';
        this.vl_total = '';
        this.dt_criada = '';
    }
}