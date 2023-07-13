import Cpf from "./Cpf";

export default class Passenger {
    name: string;
    email: string;
    // TODO: Como eu trabalho com value objects?
    // TODO: Onde eu converto o resultado? No domínio ou na API? Acho q não tenho que vazar os sub-domínios
    document: Cpf;
    passenger_id: string

    constructor(name: string, email: string, document: string){
        this.name = name;
        this.email = email;
        this.document = new Cpf(document);
        this.passenger_id = 'blabla'
    }

}