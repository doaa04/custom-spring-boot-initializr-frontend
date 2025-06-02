import { useState } from "react";

interface DependencySelectorProps {
  selectedDependencies: string[];
  setSelectedDependencies: (dependencies: string[]) => void;
}

const dependencyCategories = {
  "Developer Tools": [
    { name: "GraalVM Native Support", id: "native" },
    { name: "GraphQL DGS Code Generation", id: "dgs-codegen" },
    { name: "Spring Boot DevTools", id: "devtools" },
    { name: "Lombok", id: "lombok" },
    { name: "Spring Configuration Processor", id: "configuration-processor" },
    { name: "Docker Compose Support", id: "docker-compose" },
    { name: "Spring Modulith", id: "modulith" },
  ],
  Web: [
    { name: "Spring Web", id: "web" },
    { name: "Spring Reactive Web", id: "webflux" },
    { name: "Spring for GraphQL", id: "graphql" },
    { name: "Rest Repositories", id: "data-rest" },
    { name: "Spring Session", id: "session" },
    { name: "Rest Repositories HAL Explorer", id: "data-rest-explorer" },
    { name: "Spring HATEOAS", id: "hateoas" },
    { name: "Spring Web Services", id: "web-services" },
    { name: "Jersey", id: "jersey" },
    { name: "Vaadin", id: "vaadin" },
    { name: "Netflix DGS", id: "netflix-dgs" },
    { name: "htmx", id: "htmx" },
  ],
  "Template Engines": [
    { name: "Thymeleaf", id: "thymeleaf" },
    { name: "Apache Freemarker", id: "freemarker" },
    { name: "Mustache", id: "mustache" },
    { name: "Groovy Templates", id: "groovy-templates" },
    { name: "JTE", id: "jte" },
  ],
  Security: [
    { name: "Spring Security", id: "security" },
    { name: "OAuth2 Client", id: "oauth2-client" },
    { name: "OAuth2 Authorization Server", id: "oauth2-authorization-server" },
    { name: "OAuth2 Resource Server", id: "oauth2-resource-server" },
    { name: "Spring LDAP", id: "data-ldap" },
    { name: "Okta", id: "okta" },
  ],
  SQL: [
    { name: "JDBC API", id: "jdbc" },
    { name: "Spring Data JPA", id: "data-jpa" },
    { name: "Spring Data JDBC", id: "data-jdbc" },
    { name: "Spring Data R2DBC", id: "data-r2dbc" },
    { name: "MyBatis Framework", id: "mybatis" },
    { name: "Liquibase Migration", id: "liquibase" },
    { name: "Flyway Migration", id: "flyway" },
    { name: "JOOQ Access Layer", id: "jooq" },
    { name: "IBM DB2 Driver", id: "db2" },
    { name: "Apache Derby Database", id: "derby" },
    { name: "H2 Database", id: "h2" },
    { name: "HyperSQL Database", id: "hsql" },
    { name: "MariaDB Driver", id: "mariadb" },
    { name: "MS SQL Server Driver", id: "sqlserver" },
    { name: "MySQL Driver", id: "mysql" },
    { name: "Oracle Driver", id: "oracle" },
    { name: "PostgreSQL Driver", id: "postgresql" },
  ],
  NoSQL: [
    { name: "Spring Data Redis", id: "data-redis" },
    { name: "Spring Data Reactive Redis", id: "data-redis-reactive" },
    { name: "Spring Data MongoDB", id: "data-mongodb" },
    { name: "Spring Data Reactive MongoDB", id: "data-mongodb-reactive" },
    { name: "Spring Data Elasticsearch", id: "data-elasticsearch" },
    { name: "Spring Data Cassandra", id: "data-cassandra" },
    { name: "Spring Data Reactive Cassandra", id: "data-cassandra-reactive" },
    { name: "Spring Data Couchbase", id: "data-couchbase" },
    { name: "Spring Data Reactive Couchbase", id: "data-couchbase-reactive" },
    { name: "Spring Data Neo4j", id: "data-neo4j" },
  ],
  Messaging: [
    { name: "Spring Integration", id: "integration" },
    { name: "Spring for RabbitMQ", id: "amqp" },
    { name: "Spring for Apache Kafka", id: "kafka" },
    { name: "Spring for Apache Kafka Streams", id: "kafka-streams" },
    { name: "Apache Camel", id: "camel" },
    { name: "WebSocket", id: "websocket" },
    { name: "RSocket", id: "rsocket" },
    { name: "Spring for Apache Pulsar", id: "pulsar" },
    { name: "Spring for Apache Pulsar (Reactive)", id: "pulsar-reactive" },
    { name: "Spring for Apache ActiveMQ Artemis", id: "artemis" },
    { name: "Spring for Apache ActiveMQ 5", id: "activemq" },
  ],
  "I/O": [
    { name: "Spring Batch", id: "batch" },
    { name: "Validation", id: "validation" },
    { name: "Java Mail Sender", id: "javamail" },
    { name: "Quartz Scheduler", id: "quartz" },
    { name: "Spring cache abstraction", id: "cache" },
    { name: "Picocli", id: "picocli" },
  ],
  Ops: [
    { name: "Spring Boot Actuator", id: "actuator" },
    { name: "Codecentric's Spring Boot Admin (Server)", id: "codecentric-spring-boot-admin" },
    { name: "Codecentric's Spring Boot Admin (Client)", id: "codecentric-spring-boot-admin-client" },
  ],
  Observability: [
    { name: "Datadog", id: "datadog" },
    { name: "Influx", id: "influx" },
    { name: "Graphite", id: "graphite" },
    { name: "New Relic", id: "new-relic" },
    { name: "Prometheus", id: "prometheus" },
    { name: "Sleuth", id: "sleuth" },
    { name: "Zipkin", id: "zipkin" },
    { name: "Wavefront", id: "wavefront" },
  ],
  Testing: [
    { name: "Testcontainers", id: "testcontainers" },
    { name: "Contract Verifier", id: "contract-verifier" },
    { name: "Contract Stub Runner", id: "contract-stub-runner" },
    { name: "Embedded LDAP Server", id: "unboundid-ldap" },
    { name: "Embedded MongoDB Database", id: "embedded-mongodb" },
  ],
};

export default function DependencySelector({
  selectedDependencies,
  setSelectedDependencies,
}: DependencySelectorProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleDependency = (depId: string) => {
    setSelectedDependencies(
      selectedDependencies.includes(depId)
        ? selectedDependencies.filter((id) => id !== depId)
        : [...selectedDependencies, depId]
    );
  };

  const toggleCategory = (category: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      <h2 className="mb-3">Dependencies</h2>
      <p style={{ marginBottom: "1.5rem", color: "#6c757d" }}>
        Selected: {selectedDependencies.length} dependencies
      </p>

      {Object.entries(dependencyCategories).map(([category, deps]) => (
        <div key={category} className="category-section">
          <div
            className="category-header"
            onClick={() => toggleCategory(category)}
          >
            <span>{category}</span>
            <span>{collapsedCategories[category] ? "▼" : "▲"}</span>
          </div>
          {!collapsedCategories[category] && (
            <div className="category-content">
              {deps.map((dep) => (
                <div key={dep.id} className="dependency-item">
                  <input
                    type="checkbox"
                    id={dep.id}
                    checked={selectedDependencies.includes(dep.id)}
                    onChange={() => toggleDependency(dep.id)}
                  />
                  <label htmlFor={dep.id} className="dependency-label">
                    {dep.name}{" "}
                    <span className="dependency-id">({dep.id})</span>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
