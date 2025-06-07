import { ProjectData } from "@/pages/spring-configurator";

interface ProjectMetadataProps {
  projectData: ProjectData;
  setProjectData: (data: ProjectData) => void;
}

const javaVersions = ["8", "11", "17", "21"];
const buildTools = ["Maven", "Gradle"];

export default function ProjectMetadata({ projectData, setProjectData }: ProjectMetadataProps) {
  const updateData = (field: keyof ProjectData, value: string | boolean) => {
    setProjectData({ ...projectData, [field]: value });
  };

  return (
    <div>
      <div className="form-row">
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            value={projectData.projectName}
            onChange={(e) => updateData("projectName", e.target.value)}
            placeholder="my-spring-app"
          />
        </div>
        <div className="form-group">
          <label>Base Package</label>
          <input
            type="text"
            className="form-control"
            value={projectData.packageName}
            onChange={(e) => updateData("packageName", e.target.value)}
            placeholder="com.example.demo"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Java Version</label>
          <select
            className="form-control"
            value={projectData.javaVersion}
            onChange={(e) => updateData("javaVersion", e.target.value)}
          >
            {javaVersions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Build Tool</label>
          <select
            className="form-control"
            value={projectData.buildTool}
            onChange={(e) => updateData("buildTool", e.target.value)}
          >
            {buildTools.map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Group ID</label>
          <input
            type="text"
            className="form-control"
            value={projectData.groupId}
            onChange={(e) => updateData("groupId", e.target.value)}
            placeholder="com.example"
          />
        </div>
        <div className="form-group">
          <label>Artifact ID</label>
          <input
            type="text"
            className="form-control"
            value={projectData.artifactId}
            onChange={(e) => updateData("artifactId", e.target.value)}
            placeholder="demo"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Sprint Boot Version</label>
        <input
          type="text"
          className="form-control"
          value={projectData.version}
          onChange={(e) => updateData("version", e.target.value)}
        />
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="docker"
          checked={projectData.includeDocker}
          onChange={(e) => updateData("includeDocker", e.target.checked)}
        />
        <label htmlFor="docker">Include Docker Support</label>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="swagger"
          checked={projectData.includeSwagger}
          onChange={(e) => updateData("includeSwagger", e.target.checked)}
        />
        <label htmlFor="swagger">Include Swagger/OpenAPI</label>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="gitlab"
          checked={projectData.includeGitlabCI}
          onChange={(e) => updateData("includeGitlabCI", e.target.checked)}
        />
        <label htmlFor="gitlab">Include GitLab CI</label>
      </div>

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="git"
          checked={projectData.includeGit}
          onChange={(e) => updateData("includeGit", e.target.checked)}
        />
        <label htmlFor="git">Include Git</label>
      </div>

      {projectData.includeGit && (
        <div className="form-group">
          <label>Git Repository URL</label>
          <input
            type="text"
            className="form-control"
            value={projectData.gitUrl || ""}
            onChange={(e) => updateData("gitUrl", e.target.value)}
            placeholder="https://github.com/username/repo.git"
          />
        </div>
      )}

      <div className="checkbox-group">
        <input
          type="checkbox"
          id="tests"
          checked={projectData.includeTests}
          onChange={(e) => updateData("includeTests", e.target.checked)}
        />
        <label htmlFor="tests">Include Tests</label>
      </div>
    </div>

  );
}
