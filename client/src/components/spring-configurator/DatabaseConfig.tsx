import { DatabaseConfig } from "@/pages/spring-configurator";

interface DatabaseConfigProps {
  database: DatabaseConfig;
  setDatabase: (database: DatabaseConfig) => void;
}

const databaseTypes = ["H2", "MySQL", "PostgreSQL", "Oracle", "SQL Server", "MariaDB"];

export default function DatabaseConfigComponent({ database, setDatabase }: DatabaseConfigProps) {
  const updateDatabase = (field: keyof DatabaseConfig, value: string) => {
    setDatabase({ ...database, [field]: value });
  };

  return (
    <div>
      <h2 className="mb-3">Database Configuration</h2>

      <div className="form-group">
        <label>Database Type</label>
        <select
          className="form-control"
          value={database.type}
          onChange={(e) => updateDatabase("type", e.target.value)}
        >
          {databaseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>JDBC URL</label>
        <input
          type="text"
          className="form-control"
          value={database.url}
          onChange={(e) => updateDatabase("url", e.target.value)}
          placeholder="jdbc:h2:mem:testdb"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={database.username}
            onChange={(e) => updateDatabase("username", e.target.value)}
            placeholder="sa"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={database.password}
            onChange={(e) => updateDatabase("password", e.target.value)}
            placeholder="password"
          />
        </div>
      </div>
    </div>
  );
}
