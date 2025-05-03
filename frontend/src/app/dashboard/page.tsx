"use client";

import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Chip,
} from "@mui/material";
import {
  Work as WorkIcon,
  People as PeopleIcon,
  Description as DescriptionIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Receipt as ReceiptIcon,
  AccessTime as AccessTimeIcon,
} from "@mui/icons-material";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
}

const MetricCard = ({ title, value, icon, color = "primary" }: MetricCardProps) => (
  <Paper sx={{ p: 3, height: "100%" }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Box
        sx={{
          backgroundColor: `${color}.light`,
          color: `${color}.main`,
          borderRadius: "50%",
          p: 1,
          mr: 2,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
    </Box>
    <Typography variant="h4">{value}</Typography>
  </Paper>
);

interface Activity {
  id: string;
  type: "project" | "lead" | "proposal" | "issue";
  title: string;
  description: string;
  time: string;
  status?: "completed" | "in-progress" | "pending";
}

const Dashboard = () => {
  // Sample data - replace with actual API calls
  const metrics = {
    totalProjects: 12,
    totalLeads: 24,
    totalProposals: 18,
    totalIssues: 5,
    totalRevenue: "$45,678",
    totalPayable: "$12,345",
    totalReceivable: "$23,456",
  };

  const recentActivities: Activity[] = [
    {
      id: "1",
      type: "project",
      title: "E-commerce Website Development",
      description: "Project completed and delivered to client",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "lead",
      title: "New Lead: Tech Solutions Inc",
      description: "Initial contact made, proposal sent",
      time: "4 hours ago",
      status: "in-progress",
    },
    {
      id: "3",
      type: "proposal",
      title: "Proposal: Mobile App Development",
      description: "New proposal created and sent to client",
      time: "1 day ago",
      status: "pending",
    },
    {
      id: "4",
      type: "issue",
      title: "Bug in Payment Module",
      description: "Critical issue reported by client",
      time: "1 day ago",
      status: "in-progress",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return <WorkIcon />;
      case "lead":
        return <PeopleIcon />;
      case "proposal":
        return <DescriptionIcon />;
      case "issue":
        return <WarningIcon />;
      default:
        return <AccessTimeIcon />;
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "pending":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Projects"
            value={metrics.totalProjects}
            icon={<WorkIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Leads"
            value={metrics.totalLeads}
            icon={<PeopleIcon />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Proposals"
            value={metrics.totalProposals}
            icon={<DescriptionIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Issues"
            value={metrics.totalIssues}
            icon={<WarningIcon />}
            color="error"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value={metrics.totalRevenue}
            icon={<TrendingUpIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Payable"
            value={metrics.totalPayable}
            icon={<AccountBalanceIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Receivable"
            value={metrics.totalReceivable}
            icon={<ReceiptIcon />}
            color="info"
          />
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recent Activities
        </Typography>
        <List>
          {recentActivities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemIcon>
                  {getActivityIcon(activity.type)}
                </ListItemIcon>
                <ListItemText
                  primary={activity.title}
                  secondary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description}
                      </Typography>
                      {activity.status && (
                        <Chip
                          label={activity.status}
                          color={getStatusColor(activity.status)}
                          size="small"
                        />
                      )}
                    </Box>
                  }
                />
                <Typography variant="caption" color="text.secondary">
                  {activity.time}
                </Typography>
              </ListItem>
              {index < recentActivities.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Dashboard;