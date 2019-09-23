
export class RequestCreate {
    id: number;
    description: string;
    justification: string;
    rejectionreason: string;
    deliverymode: string;
    status: string;
    userId: number;
    

    constructor(id:number = 0, description:string ='', justification:string = '', rejectionreason: string = '', 
    deliverymode: string = '', status: string = '', userId: number = 0) {

        this.id = id;
        this.description = description;
        this.justification = justification;
        this.rejectionreason = rejectionreason;
        this.deliverymode = deliverymode;
        this.status = status;
        this.userId = userId;
    
    }
}
