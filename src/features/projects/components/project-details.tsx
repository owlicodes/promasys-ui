"use client";

import { useParams } from "next/navigation";

import { format } from "date-fns";

import { Spinner } from "@/features/common/components/spinner";
import { CreateNewSprintButton } from "@/features/sprints/components/create-new-sprint-button";

import { useProjectDetails } from "../apis/use-project-details";
import { ProjectDetailsBreadcrumb } from "./project-details-breadcrumb";

export const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = useProjectDetails(projectId);

  if (project.isLoading) {
    return <Spinner />;
  }

  if (!project.data) {
    return (
      <p>Unable to fetch project details, please try reloading the page.</p>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectDetailsBreadcrumb projectName={project.data.name} />
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Project Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Project Name:</p>
            <p>{project.data.name}</p>
          </div>
          <div>
            <p className="font-semibold">Owner:</p>
            <p>{project.data.owner.email}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Description:</p>
            <p>{project.data.description}</p>
          </div>
          <div>
            <p className="font-semibold">Date Created:</p>
            <p>{format(project.data.createdAt, "PPP")}</p>
          </div>
        </div>
        <CreateNewSprintButton />
      </div>
    </div>
  );
};
