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
} from "@mui/material";
import Link from "next/link";

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  status: "active" | "inactive";
  notes: string;
}

const NewClient = () => {
  const [client, setClient] = useState<ClientFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    status: "active",
    notes: "",
  });

  const handleChange = (field: keyof ClientFormData, value: string) => {
    setClient({ ...client, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save client
    console.log(client);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Client
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/clients"
        >
          Cancel
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Contact Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={client.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  value={client.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={client.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={client.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Address Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Address Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Street Address"
                  value={client.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  value={client.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State/Province"
                  value={client.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  value={client.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Country"
                  value={client.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={client.status}
                    label="Status"
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={3}
                  value={client.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard/clients"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Client
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewClient; 