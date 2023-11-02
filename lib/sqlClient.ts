import { createPool, Pool } from "mysql";
import errno from "./error";

// Query is used to etablish and run a sql query
class Query {
    private query: string;
    private type: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';
    constructor(query: string) {
        this.query = query;
        var i = 0;
        while (query[i] != ' ') i++;
        this.type = query.substring(0, i) as 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE';   
    }

    async exec(): Promise<Result | null> {
        if (sqlClient === null) {
            errno.setCode(45200);
            return null;
        } else {
            try {
                const data = await sqlClient.exec(this.query);
                if (this.type === 'SELECT') {
                    return new SelectResult(data as JSON[]);
                } else {
                    return new UpdateResult(this.type, data);
                }
            } catch (error) {
                errno.setCustomMessage(error as string);
                return null;
            }
        }
    }
}

class Result {
    constructor(protected type: string) {}
}

class SelectResult extends Result {
    private data: JSON[];
    constructor(data: JSON[]) {
        super('SELECT');
        this.data = data;
    }

    getData() {
        return this.data;
    }

    countData() {
        return this.data.length;
    }
}

class UpdateResult extends Result {
    private status: boolean;
    private affectedRows: number;
    private warningCount: number;
    private message: string;

    constructor(type: string, data: any) {
        super(type);
        this.affectedRows = data.affectedRows;
        this.warningCount = data.warningCount;
        this.message = data.message;
        if (this.warningCount == 0) this.status = true;
        else this.status = false;
    }

    ok() {
        return this.status;
    }

    getAffectedRows() {
        return this.affectedRows;
    }

    getWarningCount() {
        return this.warningCount;
    }

    getMessage() {
        return this.message;
    }
}

// The SQLClient class is used to interact with MySQL database.
class SQLClient {
    private pool: Pool
    constructor(host: string, user: string, password: string, database: string, port: number = 3306, connectionLimit: number = 10) {
        this.pool = createPool({
            host: host,
            user: user,
            password: password,
            database: database,
            port: port,
            connectionLimit: connectionLimit,
        });
    };

    // This method execute the query and return the results
    // @params: {
    //      query: string
    // }
    // @ret: any
    public async exec(query: string) {
        return new Promise((resolve, reject) => {
            this.pool.query(query, (error, result) => {
                if (error) return reject(error);
                else return resolve(result);
            })
        })
    }
}

var sqlClient: SQLClient | null = null;
export { Query, UpdateResult, SelectResult };