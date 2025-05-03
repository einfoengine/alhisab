"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface TeamMember {
  id: string;
  name: string;
  role: string;
}

const NewProject = () => {
  const [project, setProject] = useState({
    name: "",
    client: "",
    description: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    status: "planning",
    budget: 0,
    priority: "medium",
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: "1", name: "", role: "" },
  ]);

  const handleProjectChange = (field: string, value: string | number) => {
    setProject({ ...project, [field]: value });
  };

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index] = {
      ...newMembers[index],
      [field]: value,
    };
    setTeamMembers(newMembers);
  };

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { id: String(teamMembers.length + 1), name: "", role: "" },
    ]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save project
    console.log({
      project,
      teamMembers,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Project
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/projects"
        >
          Cancel
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Project Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Project Name"
                  value={project.name}
                  onChange={(e) => handleProjectChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client"
                  value={project.client}
                  onChange={(e) => handleProjectChange("client", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={project.description}
                  onChange={(e) => handleProjectChange("description", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Project Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  value={project.startDate}
                  onChange={(e) => handleProjectChange("startDate", e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  value={project.endDate}
                  onChange={(e) => handleProjectChange("endDate", e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={project.status}
                    label="Status"
                    onChange={(e) => handleProjectChange("status", e.target.value)}
                  >
                    <MenuItem value="planning">Planning</MenuItem>
                    <MenuItem value="in-progress">In Progress</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="on-hold">On Hold</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Budget"
                  type="number"
                  value={project.budget}
                  onChange={(e) => handleProjectChange("budget", Number(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <Chip label="$" />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={project.priority}
                    label="Priority"
                    onChange={(e) => handleProjectChange("priority", e.target.value)}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Team Members */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">Team Members</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addTeamMember}
              >
                Add Member
              </Button>
            </Box>
            {teamMembers.map((member, index) => (
              <Grid container spacing={2} key={member.id} sx={{ mb: 2 }}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={member.name}
                    onChange={(e) => handleTeamMemberChange(index, "name", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={member.role}
                    onChange={(e) => handleTeamMemberChange(index, "role", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <IconButton
                    color="error"
                    onClick={() => removeTeamMember(index)}
                    disabled={teamMembers.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard/projects"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Project
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewProject; 