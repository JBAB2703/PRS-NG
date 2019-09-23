
export class RequestLine {
    id: number;
    requestId: number;
    productid: number;
    quantity: number;

    constructor(id:number = 0, requestId:number = 0, productid:number = 0, quantity:number = 0) {

        this.id = id;
        this.requestId = requestId;
        this.productid = productid;
        this.quantity = quantity;
    }
}
