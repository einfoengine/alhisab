"use client";
import React, { useState } from "react";
import TableBuilder from "@/components/TableBuilder";
import planningData from "@/data/planning.json";
import planningStatus from "@/data/planningStatus.json";
import users from "@/data/users.json";
import clients from "@/data/clients.json";
import tasks from "@/data/tasks.json";

type Planning = {
  id: string;
  title: string;
  description: string;
  operation_master: string;
  planners: string[];
  tasks: string[];
  status: string;
  start_date: string;
  end_date: string;
  cost: number;
};

type User = { id: string; name: string };
type Client = { id: string; client_name: string };
type Task = { id: string; title: string };

const userList: User[] = users.users;
const clientList: Client[] = clients as Client[];
const taskList: Task[] = tasks.tasks;

const getUserOrClientName = (id: string) => {
  const user = userList.find((u) => u.id === id);
  if (user) return user.name;
  const client = clientList.find((c) => c.id === id);
  if (client) return client.client_name;
  return id;
};

const getTaskTitle = (id: string) => {
  const task = taskList.find((t) => t.id === id);
  return task ? task.title : id;
};

const PlanningPage = () => {
  const [data] = useState<Planning[]>(planningData.planning);

  const columns = [
    { key: "id", label: "ID", width: 80 },
    { key: "title", label: "Title", width: 200 },
    { key: "description", label: "Description", width: 300 },
    { key: "operation_master", label: "Operation Master", width: 160, render: (value: unknown) => typeof value === 'string' ? getUserOrClientName(value) : '' },
    { key: "planners", label: "Planners", width: 200, render: (value: unknown) => Array.isArray(value) ? value.map(getUserOrClientName).join(", ") : '' },
    { key: "tasks", label: "Tasks", width: 200, render: (value: unknown) => Array.isArray(value) ? value.map(getTaskTitle).join(", ") : '' },
    { key: "status", label: "Status", width: 140, editable: true, type: "select", options: planningStatus.statuses },
    { key: "start_date", label: "Start Date", width: 120 },
    { key: "end_date", label: "End Date", width: 120 },
    { key: "cost", label: "Cost", width: 100 },
  ];

  return (
    <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Planning</h1>
      <TableBuilder
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default PlanningPage; 