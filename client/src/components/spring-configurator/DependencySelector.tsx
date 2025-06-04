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
    { name: "Spring Data Redis (Access+Driver)", id: "data-redis" },
    { name: "Spring Data Reactive Redis", id: "data-redis-reactive" },
    { name: "Spring Data MongoDB", id: "data-mongodb" },
    { name: "Spring Data Reactive MongoDB", id: "data-mongodb-reactive" },
    { name: "Spring Data Elasticsearch (Access+Driver)", id: "data-elasticsearch" },
    { name: "Spring Data for Apache Cassandra", id: "data-cassandra" },
    { name: "Spring Data Reactive for Apache Cassandra", id: "data-cassandra-reactive" },
    { name: "Spring Data Couchbase", id: "data-couchbase" },
    { name: "Spring Data Reactive Couchbase", id: "data-couchbase-reactive" },
    { name: "Spring Data Neo4j", id: "data-neo4j" },
  ],
  Messaging: [
    { name: "Spring Integration", id: "integration" },
    { name: "Spring for RabbitMQ", id: "amqp" },
    { name: "Spring for RabbitMQ Streams", id: "amqp-streams" },
    { name: "Spring for Apache Kafka", id: "kafka" },
    { name: "Spring for Apache Kafka Streams", id: "kafka-streams" },
    { name: "Spring for Apache ActiveMQ 5", id: "activemq" },
    { name: "Spring for Apache ActiveMQ Artemis", id: "artemis" },
    { name: "Spring for Apache Pulsar", id: "pulsar" },
    { name: "Spring for Apache Pulsar (Reactive)", id: "pulsar-reactive" },
    { name: "WebSocket", id: "websocket" },
    { name: "RSocket", id: "rsocket" },
    { name: "Apache Camel", id: "camel" },
    { name: "Solace PubSub+", id: "solace" },
  ],
  "I/O": [
    { name: "Spring Batch", id: "batch" },
    { name: "Validation", id: "validation" },
    { name: "Java Mail Sender", id: "mail" },
    { name: "Quartz Scheduler", id: "quartz" },
    { name: "Spring Cache Abstraction", id: "cache" },
    { name: "Spring Shell", id: "spring-shell" },
    { name: "Spring gRPC", id: "spring-grpc" },
  ],
  Ops: [
    { name: "Spring Boot Actuator", id: "actuator" },
    { name: "CycloneDX SBOM support", id: "sbom-cyclone-dx" },
    { name: "codecentric's Spring Boot Admin (Client)", id: "codecentric-spring-boot-admin-client" },
    { name: "codecentric's Spring Boot Admin (Server)", id: "codecentric-spring-boot-admin-server" },
    { name: "Sentry", id: "sentry" },
  ],
  Observability: [
    { name: "Datadog", id: "datadog" },
    { name: "Dynatrace", id: "dynatrace" },
    { name: "Influx", id: "influx" },
    { name: "Graphite", id: "graphite" },
    { name: "New Relic", id: "new-relic" },
    { name: "OTLP for metrics", id: "otlp-metrics" },
    { name: "Prometheus", id: "prometheus" },
    { name: "Distributed Tracing", id: "distributed-tracing" },
    { name: "Wavefront", id: "wavefront" },
    { name: "Zipkin", id: "zipkin" },
  ],
  Testing: [
    { name: "Spring REST Docs", id: "restdocs" },
    { name: "Testcontainers", id: "testcontainers" },
    { name: "Contract Verifier", id: "cloud-contract-verifier" },
    { name: "Contract Stub Runner", id: "cloud-contract-stub-runner" },
    { name: "Embedded LDAP Server", id: "unboundid-ldap" },
  ],
  "Spring Cloud": [
    { name: "Cloud Bootstrap", id: "cloud-starter" },
    { name: "Function", id: "cloud-function" },
    { name: "Task", id: "cloud-task" },
  ],
  "Spring Cloud Config": [
    { name: "Config Client", id: "cloud-config-client" },
    { name: "Config Server", id: "cloud-config-server" },
    { name: "Vault Configuration", id: "cloud-starter-vault-config" },
    { name: "Apache Zookeeper Configuration", id: "cloud-starter-zookeeper-config" },
    { name: "Consul Configuration", id: "cloud-starter-consul-config" },
  ],
  "Spring Cloud Discovery": [
    { name: "Eureka Discovery Client", id: "cloud-eureka" },
    { name: "Eureka Server", id: "cloud-eureka-server" },
    { name: "Apache Zookeeper Discovery", id: "cloud-starter-zookeeper-discovery" },
    { name: "Consul Discovery", id: "cloud-starter-consul-discovery" },
  ],
  "Spring Cloud Routing": [
    { name: "Gateway", id: "cloud-gateway" },
    { name: "Reactive Gateway", id: "cloud-gateway-reactive" },
    { name: "OpenFeign", id: "cloud-feign" },
    { name: "Cloud LoadBalancer", id: "cloud-loadbalancer" },
  ],
  "Spring Cloud Circuit Breaker": [
    { name: "Resilience4J", id: "cloud-resilience4j" },
  ],
  "Spring Cloud Messaging": [
    { name: "Cloud Bus", id: "cloud-bus" },
    { name: "Cloud Stream", id: "cloud-stream" },
  ],
  "VMware Tanzu Application Service": [
    { name: "Config Client (TAS)", id: "scs-config-client" },
    { name: "Service Registry (TAS)", id: "scs-service-registry" },
  ],
  "VMware Tanzu Spring Enterprise Extensions": [
    { name: "Governance Starter [Enterprise]", id: "tanzu-governance-starter" },
    { name: "Spring Cloud Gateway Access Control [Enterprise]", id: "tanzu-scg-access-control" },
    { name: "Spring Cloud Gateway Custom [Enterprise]", id: "tanzu-scg-custom" },
    { name: "Spring Cloud Gateway GraphQL [Enterprise]", id: "tanzu-scg-graphql" },
    { name: "Spring Cloud Gateway Single Sign On [Enterprise]", id: "tanzu-scg-sso" },
    { name: "Spring Cloud Gateway Traffic Control [Enterprise]", id: "tanzu-scg-traffic-control" },
    { name: "Spring Cloud Gateway Transformation [Enterprise]", id: "tanzu-scg-transformation" },
  ],
  "Microsoft Azure": [
    { name: "Azure Support", id: "azure-support" },
    { name: "Azure Active Directory", id: "azure-active-directory" },
    { name: "Azure Cosmos DB", id: "azure-cosmos-db" },
    { name: "Azure Key Vault", id: "azure-keyvault" },
    { name: "Azure Storage", id: "azure-storage" },
  ],
  "Google Cloud": [
    { name: "Google Cloud Support", id: "cloud-gcp" },
    { name: "Google Cloud Messaging", id: "cloud-gcp-pubsub" },
    { name: "Google Cloud Storage", id: "cloud-gcp-storage" },
  ],
  AI: [
    { name: "Anthropic Claude", id: "spring-ai-anthropic" },
    { name: "Azure OpenAI", id: "spring-ai-azure-openai" },
    { name: "Azure AI Search", id: "spring-ai-vectordb-azure" },
    { name: "Amazon Bedrock", id: "spring-ai-bedrock" },
    { name: "Amazon Bedrock Converse", id: "spring-ai-bedrock-converse" },
    { name: "Apache Cassandra Vector Database", id: "spring-ai-vectordb-cassandra" },
    { name: "Chroma Vector Database", id: "spring-ai-vectordb-chroma" },
    { name: "Elasticsearch Vector Database", id: "spring-ai-vectordb-elasticsearch" },
    { name: "Model Context Protocol Server", id: "spring-ai-mcp-server" },
    { name: "Model Context Protocol Client", id: "spring-ai-mcp-client" },
    { name: "Milvus Vector Database", id: "spring-ai-vectordb-milvus" },
    { name: "Mistral AI", id: "spring-ai-mistral" },
    { name: "MongoDB Atlas Vector Database", id: "spring-ai-vectordb-mongodb-atlas" },
    { name: "Neo4j Vector Database", id: "spring-ai-vectordb-neo4j" },
    { name: "Ollama", id: "spring-ai-ollama" },
    { name: "OpenAI", id: "spring-ai-openai" },
    { name: "In-memory Chat Memory Repository", id: "spring-ai-chat-memory-repository-in-memory" },
    { name: "JDBC Chat Memory Repository", id: "spring-ai-chat-memory-repository-jdbc" },
    { name: "Cassandra Chat Memory Repository", id: "spring-ai-chat-memory-repository-cassandra" },
    { name: "Neo4j Chat Memory Repository", id: "spring-ai-chat-memory-repository-neo4j" },
    { name: "Oracle Vector Database", id: "spring-ai-vectordb-oracle" },
    { name: "PGvector Vector Database", id: "spring-ai-vectordb-pgvector" },
    { name: "Pinecone Vector Database", id: "spring-ai-vectordb-pinecone" },
    { name: "PostgresML", id: "spring-ai-postgresml" },
    { name: "Redis Search and Query Vector Database", id: "spring-ai-vectordb-redis" },
    { name: "MariaDB Vector Database", id: "spring-ai-vectordb-mariadb" },
    { name: "Azure Cosmos DB Vector Store", id: "spring-ai-vectordb-azurecosmosdb" },
    { name: "Stability AI", id: "spring-ai-stabilityai" },
    { name: "Transformers (ONNX) Embeddings", id: "spring-ai-transformers" },
    { name: "Vertex AI Gemini", id: "spring-ai-vertexai-gemini" },
    { name: "Vertex AI Embeddings", id: "spring-ai-vertexai-embeddings" },
    { name: "Qdrant Vector Database", id: "spring-ai-vectordb-qdrant" },
    { name: "Typesense Vector Database", id: "spring-ai-vectordb-typesense" },
    { name: "Weaviate Vector Database", id: "spring-ai-vectordb-weaviate" },
    { name: "Markdown Document Reader", id: "spring-ai-markdown-document-reader" },
    { name: "Tika Document Reader", id: "spring-ai-tika-document-reader" },
    { name: "PDF Document Reader", id: "spring-ai-pdf-document-reader" },
    { name: "Timefold Solver", id: "timefold-solver" },
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
