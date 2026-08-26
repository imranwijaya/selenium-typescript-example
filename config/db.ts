import mysql, { type QueryResult, type QueryValues } from "mysql2/promise";
import env from "@config/env";

async function execute<T extends QueryResult>(q: string) {
  const connection = await mysql.createConnection(env.db);

  try {
    const [rows] = await connection.execute<T>(q);
    return rows;
  } finally {
    await connection.end();
  }
}

async function query<T extends QueryResult>(sql: string, values: QueryValues) {
  const connection = await mysql.createConnection(env.db);

  try {
    const rows = await connection.query<T>(sql, values);
    return rows;
  } finally {
    await connection.end();
  }
}

export { execute, query };
