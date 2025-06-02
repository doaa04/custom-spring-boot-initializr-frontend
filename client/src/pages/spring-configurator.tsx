import { useState } from "react";
import StepIndicator from "@/components/spring-configurator/StepIndicator";
import ProjectMetadata from "@/components/spring-configurator/ProjectMetadata";
import EntitiesDesigner from "@/components/spring-configurator/EntitiesDesigner";
import DatabaseConfig from "@/components/spring-configurator/DatabaseConfig";
import DependencySelector from "@/components/spring-configurator/DependencySelector";
import GenerateProject from "@/components/spring-configurator/GenerateProject";
import "@/styles/spring-configurator.css";

export interface ProjectData {
  projectName: string;
  packageName: string;
  javaVersion: string;
  buildTool: string;
  groupId: string;
  artifactId: string;
  version: string;
  description: string;
  includeDocker: boolean;
  includeSwagger: boolean;
  includeGitlabCI: boolean;
}

export interface Entity {
  id: string;
  name: string;
  fields: Field[];
}

export interface Field {
  id: string;
  name: string;
  type: string;
}

export interface DatabaseConfig {
  type: string;
  url: string;
  username: string;
  password: string;
}

export default function SpringConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedJson, setGeneratedJson] = useState<string>("");

  // Project metadata state
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    packageName: "com.example.demo",
    javaVersion: "17",
    buildTool: "Maven",
    groupId: "com.example",
    artifactId: "",
    version: "0.0.1-SNAPSHOT",
    description: "",
    includeDocker: false,
    includeSwagger: false,
    includeGitlabCI: false,
  });

  // Entities state
  const [entities, setEntities] = useState<Entity[]>([]);

  // Database state
  const [database, setDatabase] = useState<DatabaseConfig>({
    type: "H2",
    url: "jdbc:h2:mem:testdb",
    username: "sa",
    password: "password",
  });

  // Dependencies state
  const [selectedDependencies, setSelectedDependencies] = useState<string[]>([]);

  const stepTitles = [
    "Project Metadata",
    "Entities Designer",
    "Database Configuration",
    "Dependency Selector",
    "Generate Project",
  ];

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const generateProject = async () => {
    setIsGenerating(true);

    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const finalJson = {
      projectName: projectData.projectName,
      packageName: projectData.packageName,
      javaVersion: projectData.javaVersion,
      buildTool: projectData.buildTool.toLowerCase(),
      groupId: projectData.groupId,
      artifactId: projectData.artifactId,
      version: projectData.version,
      description: projectData.description,
      database,
      dependencies: selectedDependencies,
      entities: entities
        .filter((e) => e.name.trim() !== "")
        .map((e) => ({
          name: e.name,
          fields: e.fields.filter((f) => f.name.trim() !== ""),
        })),
      includeDocker: projectData.includeDocker,
      includeSwagger: projectData.includeSwagger,
      includeGitlabCI: projectData.includeGitlabCI,
    };

    setGeneratedJson(JSON.stringify(finalJson, null, 2));
    setIsGenerating(false);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectMetadata
            projectData={projectData}
            setProjectData={setProjectData}
          />
        );
      case 1:
        return (
          <EntitiesDesigner entities={entities} setEntities={setEntities} />
        );
      case 2:
        return (
          <DatabaseConfig database={database} setDatabase={setDatabase} />
        );
      case 3:
        return (
          <DependencySelector
            selectedDependencies={selectedDependencies}
            setSelectedDependencies={setSelectedDependencies}
          />
        );
      case 4:
        return (
          <GenerateProject
            generatedJson={generatedJson}
            isGenerating={isGenerating}
            onGenerate={generateProject}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Spring Boot Project Generator</h1>
        <p>Create custom Spring Boot projects with entities, dependencies, and configurations</p>
      </div>

      <StepIndicator
        steps={stepTitles}
        currentStep={currentStep}
        onStepClick={goToStep}
      />

      <div className="main-content">{renderCurrentStep()}</div>

      <div className="navigation">
        <button
          className={`btn btn-secondary ${currentStep === 0 ? "hidden" : ""}`}
          onClick={prevStep}
        >
          ← Previous
        </button>
        <div></div>
        <button
          className={`btn btn-primary ${currentStep === 4 ? "hidden" : ""}`}
          onClick={nextStep}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
