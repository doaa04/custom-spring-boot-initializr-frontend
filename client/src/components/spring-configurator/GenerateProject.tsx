import axios from "axios";
import { useState } from "react";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [suggestion, setSuggestion] = useState<null | any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!generatedJson) return;
    setIsAnalyzing(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/analyze",
        generatedJson,
        { headers: { "Content-Type": "application/json" } }
      );
      setSuggestion(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze project. Check console.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);  // start loading
    try {
      console.log("Sending project generation request to backend...");
      const response = await axios.post(
        "http://localhost:8080/api/generate",
        generatedJson, // request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob",  // important if downloading files
        }
      );
      console.log("Response received from backend:", response.data);

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "project.zip"); // filename
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error during project download request:", error);
      alert("Failed to download project. Check console for details.");
    } finally {
      setIsDownloading(false);  // stop loading
    }
  };

  return (
    <div>
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

            <button
              className="btn btn-primary"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              style={{ marginRight: "1rem" }}
            >
              {isAnalyzing ? "Analyzing..." : "🔍 Analyze Dependencies"}
            </button>

            <button
              className="btn btn-primary"
              onClick={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading && <span className="loading-spinner"></span>}{" "}
              📦 Download Project (.zip)
            </button>
          </div>

          {/* Show suggestion if available */}
          {suggestion && (
            <div
              style={{
                marginBottom: "1rem",
                border: "1px solid #ccc",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                borderRadius: "6px",
              }}
            >
              <p>
                {suggestion.compatible ? (
                  <span style={{ color: "green" }}> ✅</span>
                ) : (
                  <span style={{ color: "red" }}> ❌</span>
                )}
              </p>
              <p>
                {suggestion.explanation}
              </p>
              {suggestion.recommendedJavaVersion && (
                <p>
                  <strong>Recommended Java Version:</strong> {suggestion.recommendedJavaVersion}
                </p>
              )}
              {suggestion.recommendedSpringBootVersion && (
                <p>
                  <strong>Recommended Spring Boot Version:</strong> {suggestion.recommendedSpringBootVersion}
                </p>
              )}
            </div>
          )}


          <div className="code-preview">{generatedJson}</div>
        </div>
      )}
    </div>
  );
}
