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
} from "@mui/material";
import Link from "next/link";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  type: "admin" | "director" | "manager" | "member" | "client";
  status: "active" | "inactive";
}

const NewUser = () => {
  const [user, setUser] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "member",
    status: "active",
  });

  const handleChange = (field: keyof UserFormData, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save user
    console.log(user);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New User
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/users"
        >
          Cancel
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={user.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={user.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Security */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Security
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={user.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                  error={user.password !== user.confirmPassword}
                  helperText={
                    user.password !== user.confirmPassword
                      ? "Passwords do not match"
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* User Settings */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              User Settings
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>User Type</InputLabel>
                  <Select
                    value={user.type}
                    label="User Type"
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="director">Director</MenuItem>
                    <MenuItem value="manager">Manager</MenuItem>
                    <MenuItem value="member">Member</MenuItem>
                    <MenuItem value="client">Client</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={user.status}
                    label="Status"
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard/users"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={user.password !== user.confirmPassword}
              >
                Create User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewUser; 