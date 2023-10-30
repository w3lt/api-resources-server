import { createPool, Pool } from "mysql";

class SQLClient {
    private pool: Pool
    constructor(host: string, user: string, password: string, database: string, port: number = 3306, connection_limit: number = 10) {
        this.pool = createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
            connectionLimit: connection_limit,
        });
    };

    // This method execute the query and return the results
    // @params: {
    //      query: string
    // }
    // @ret: any
    public exec(query: string) {

    }
}

export {SQLClient};