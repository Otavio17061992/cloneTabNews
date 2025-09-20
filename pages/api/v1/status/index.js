import database from "Infra/database.js";
import { version } from "react";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseName = process.env.POSTGRES_DB;
  const DatabaseVerisonResult = await database.query("SHOW server_version;");
  const MaxConnectionDB = await database.query("SHOW max_connections;");
  const connetionsOpend = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseversionValue = DatabaseVerisonResult.rows[0].server_version;
  const dataServerMaxConnection = MaxConnectionDB.rows[0].max_connections;
  const connectionsOpened = connetionsOpend.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(dataServerMaxConnection),
        verison: databaseversionValue,
        opened_connections: connectionsOpened,
      },
    },
  });
}

export default status;
