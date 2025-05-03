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
  InputAdornment,
} from "@mui/material";
import Link from "next/link";

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  standardDeliveryTime: string;
  status: "active" | "inactive";
  category: string;
}

const NewService = () => {
  const [service, setService] = useState<ServiceFormData>({
    name: "",
    description: "",
    price: 0,
    standardDeliveryTime: "",
    status: "active",
    category: "",
  });

  const handleChange = (field: keyof ServiceFormData, value: string | number) => {
    setService({ ...service, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save service
    console.log(service);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Service
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/services"
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
                  label="Service Name"
                  value={service.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={service.category}
                    label="Category"
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <MenuItem value="Development">Development</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Marketing">Marketing</MenuItem>
                    <MenuItem value="Consulting">Consulting</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={service.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Pricing and Delivery */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Pricing and Delivery
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={service.price}
                  onChange={(e) => handleChange("price", Number(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Standard Delivery Time"
                  value={service.standardDeliveryTime}
                  onChange={(e) => handleChange("standardDeliveryTime", e.target.value)}
                  required
                  placeholder="e.g., 2-4 weeks"
                  helperText="Enter the estimated delivery time range"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Status */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={service.status}
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
                href="/dashboard/services"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Service
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewService; 