interface GenerateProjectProps {
  generatedJson: string;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function GenerateProject({
  generatedJson,
  isGenerating,
  onGenerate,
}: GenerateProjectProps) {
  const handleDownload = () => {
    // Mock download functionality
    alert("Download functionality would be implemented here!");
  };

  return (
    <div>
      <h2 className="mb-3">Generate Project</h2>

      {!generatedJson ? (
        <div className="text-center">
          <p style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>
            Ready to generate your Spring Boot project?
          </p>
          <button
            className="btn btn-primary"
            onClick={onGenerate}
            disabled={isGenerating}
            style={{ fontSize: "1.1rem", padding: "1rem 2rem" }}
          >
            {isGenerating && <span className="loading-spinner"></span>}
            {isGenerating ? "Generating..." : "🚀 Generate Project"}
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h3>Generated Configuration</h3>
            <button className="btn btn-primary" onClick={handleDownload}>
              📦 Download Project (.zip)
            </button>
          </div>
          <div className="code-preview">{generatedJson}</div>
        </div>
      )}
    </div>
  );
}
