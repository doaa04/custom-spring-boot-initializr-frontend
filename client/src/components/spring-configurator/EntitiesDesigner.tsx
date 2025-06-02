import { Entity, Field } from "@/pages/spring-configurator";

interface EntitiesDesignerProps {
  entities: Entity[];
  setEntities: (entities: Entity[]) => void;
}

const fieldTypes = [
  "String",
  "int",
  "Long",
  "boolean",
  "Date",
  "Double",
  "Float",
  "BigDecimal",
  "LocalDateTime",
  "UUID",
];

export default function EntitiesDesigner({ entities, setEntities }: EntitiesDesignerProps) {
  const addEntity = () => {
    const newEntity: Entity = {
      id: Date.now().toString(),
      name: "",
      fields: [{ id: Date.now().toString(), name: "", type: "String" }],
    };
    setEntities([...entities, newEntity]);
  };

  const removeEntity = (entityId: string) => {
    setEntities(entities.filter((e) => e.id !== entityId));
  };

  const updateEntity = (entityId: string, field: keyof Entity, value: any) => {
    setEntities(
      entities.map((e) => (e.id === entityId ? { ...e, [field]: value } : e))
    );
  };

  const addField = (entityId: string) => {
    setEntities(
      entities.map((e) =>
        e.id === entityId
          ? {
              ...e,
              fields: [
                ...e.fields,
                { id: Date.now().toString(), name: "", type: "String" },
              ],
            }
          : e
      )
    );
  };

  const removeField = (entityId: string, fieldId: string) => {
    setEntities(
      entities.map((e) =>
        e.id === entityId
          ? { ...e, fields: e.fields.filter((f) => f.id !== fieldId) }
          : e
      )
    );
  };

  const updateField = (
    entityId: string,
    fieldId: string,
    field: keyof Field,
    value: any
  ) => {
    setEntities(
      entities.map((e) =>
        e.id === entityId
          ? {
              ...e,
              fields: e.fields.map((f) =>
                f.id === fieldId ? { ...f, [field]: value } : f
              ),
            }
          : e
      )
    );
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2>Entities Designer</h2>
        <button className="btn btn-primary btn-small" onClick={addEntity}>
          ➕ Add Entity
        </button>
      </div>

      {entities.map((entity) => (
        <div key={entity.id} className="entity-card">
          <div className="entity-header">
            <div
              className="form-group"
              style={{ flex: 1, marginBottom: 0, marginRight: "1rem" }}
            >
              <label>Entity Name</label>
              <input
                type="text"
                className="form-control"
                value={entity.name}
                onChange={(e) => updateEntity(entity.id, "name", e.target.value)}
                placeholder="User"
              />
            </div>
            <button
              className="btn btn-danger btn-small"
              onClick={() => removeEntity(entity.id)}
              disabled={entities.length === 1}
            >
              ➖ Remove Entity
            </button>
          </div>

          <h4 style={{ marginBottom: "1rem" }}>Fields</h4>

          {entity.fields.map((field) => (
            <div key={field.id} className="field-row">
              <div className="form-group" style={{ marginBottom: 0 }}>
                <input
                  type="text"
                  className="form-control"
                  value={field.name}
                  onChange={(e) =>
                    updateField(entity.id, field.id, "name", e.target.value)
                  }
                  placeholder="fieldName"
                />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <select
                  className="form-control"
                  value={field.type}
                  onChange={(e) =>
                    updateField(entity.id, field.id, "type", e.target.value)
                  }
                >
                  {fieldTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-danger btn-small"
                onClick={() => removeField(entity.id, field.id)}
                disabled={entity.fields.length === 1}
              >
                ➖
              </button>
            </div>
          ))}

          <button
            className="btn btn-outline btn-small mt-3"
            onClick={() => addField(entity.id)}
          >
            ➕ Add Field
          </button>
        </div>
      ))}

      {entities.length === 0 && (
        <div className="text-center" style={{ padding: "2rem" }}>
          <p style={{ color: "#6c757d", marginBottom: "1rem" }}>
            No entities defined yet. Add your first entity to get started.
          </p>
          <button className="btn btn-primary" onClick={addEntity}>
            ➕ Add First Entity
          </button>
        </div>
      )}
    </div>
  );
}
