"use client";

import { useRouter } from "next/navigation";
import TableBuilder from "@/components/TableBuilder";
import planningData from "@/data/planning.json";
import projects from "@/data/projects.json";
import users from "@/data/users.json";
import clients from "@/data/clients.json";
import planningStatus from "@/data/planningStatus.json";
import planningTypes from "@/data/planningTypes.json";
import { Planning } from "@/types/planning";
import { Column } from "@/types/table";
import Image from "next/image";
import { ReactNode } from "react";

type Client = {
  id: string;
  client_name: string;
  avatar?: string;
};

type User = {
  id: string;
  name: string;
  avatar?: string;
};

type PlanningType = {
  id: string;
  name: string;
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case "complete":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "deleted":
      return "bg-red-100 text-red-800";
    case "archived":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
};

export default function PlanningPage() {
  const router = useRouter();

  const columns: Column<Planning>[] = [
    {
      key: "id",
      label: "ID",
      sortable: true,
    },
    {
      key: "title",
      label: "Title",
      sortable: true,
      render: (value: unknown, row: Planning): ReactNode => (
        <div>
          <div className="font-medium text-gray-900">{String(value)}</div>
          <div className="text-sm text-gray-500">{row.description}</div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      sortable: true,
      editable: true,
      options: (planningTypes.types as PlanningType[]).map((t) => ({
        id: t.id,
        name: t.name,
      })),
    },
    {
      key: "project_id",
      label: "Project",
      sortable: true,
      editable: true,
      options: projects.projects.map((p) => ({ id: p.id, name: p.name })),
      render: (value: unknown): ReactNode => {
        const project = projects.projects.find((p) => p.id === value);
        return project ? project.name : String(value);
      },
    },
    {
      key: "operation_master",
      label: "Operation Master",
      sortable: true,
      editable: true,
      options: users.users.map((u) => ({ id: u.id, name: u.name })),
      render: (value: unknown): ReactNode => {
        const user = users.users.find((u) => u.id === value) as User;
        return (
          <div className="flex items-center gap-2">
            {user?.avatar && (
              <Image
                src={user.avatar}
                alt={user.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span>{user?.name || String(value)}</span>
          </div>
        );
      },
    },
    {
      key: "planners",
      label: "Planners",
      render: (value: unknown): ReactNode => {
        const planners = value as string[];
        return (
          <div className="flex -space-x-2">
            {planners.map((id) => {
              const user = users.users.find((u) => u.id === id) as User;
              const client = (clients as Client[]).find((c) => c.id === id);
              const entity = user || client;
              return entity ? (
                <Image
                  key={id}
                  src={entity.avatar || "/default-avatar.png"}
                  alt={user ? user.name : client?.client_name || ""}
                  width={24}
                  height={24}
                  className="rounded-full border-2 border-white"
                  title={user ? user.name : client?.client_name || ""}
                />
              ) : null;
            })}
          </div>
        );
      },
    },
    {
      key: "tasks",
      label: "Tasks",
      render: (value: unknown): ReactNode => {
        const tasks = value as string[];
        const taskCount = tasks.length;
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-900">
              {taskCount} {taskCount === 1 ? "Task" : "Tasks"}
            </span>
          </div>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      editable: true,
      options: planningStatus.statuses.map((s) => ({ id: s, name: s })),
      render: (value: unknown): ReactNode => {
        const status = String(value);
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status.replace(/_/g, " ")}
          </span>
        );
      },
    },
    {
      key: "start_date",
      label: "Start Date",
      sortable: true,
    },
    {
      key: "end_date",
      label: "End Date",
      sortable: true,
    },
    {
      key: "cost",
      label: "Cost",
      sortable: true,
      render: (value: unknown): ReactNode => `$${(value as number).toLocaleString()}`,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Planning</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and track your planning activities
        </p>
      </div>

      <TableBuilder
        data={planningData.planning}
        columns={columns}
        onRowClick={(row) => router.push(`/client-management/planning/${row.id}`)}
      />
    </div>
  );
} 