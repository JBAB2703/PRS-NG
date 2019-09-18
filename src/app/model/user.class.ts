export class User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    isreviewer: boolean;
    isadmin: boolean;

    constructor(id:number = 0, username:string ='', password:string = '', firstname:string = '', 
    lastname:string = '', phone:string = '', email:string = '', isreviewer:boolean = false, isadmin:boolean = false){

        this.id = id;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.email = email;
        this.isreviewer = isreviewer;
        this.isadmin = isadmin;
    }
}
