import { Vendor } from './vendor.class';
import { User } from './user.class';


export class Request {
    id: number;
    description: string;
    justification: string;
    rejectionreason: string;
    deliverymode: string;
    status: string;
    userId: number;
    user: User;
    total: number;

    constructor(id:number = 0, description:string ='', justification:string = '', rejectionreason: string = '', 
    deliverymode: string = '', status: string = '', userId: number = 0, user: User = new User()) {

        this.id = id;
        this.description = description;
        this.justification = justification;
        this.rejectionreason = rejectionreason;
        this.deliverymode = deliverymode;
        this.status = status;
        this.userId = userId;
        this.user = user;
    }
}
