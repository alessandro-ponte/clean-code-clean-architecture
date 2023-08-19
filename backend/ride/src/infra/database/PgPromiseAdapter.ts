import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

// Frameworks and Drivres - Adaptando para o pg-promise
export default class PgPromiseAdapter implements DatabaseConnection {
    private connection: any;

    constructor () {
        this.connection = pgp()("postgres://postgres@localhost:5432/app");        
    }
    async query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    async close(): Promise<void> {
        await this.connection.$pool.end();
    }    
}