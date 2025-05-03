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
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";

interface AdjustmentFormData {
  date: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
  type: "accrual" | "deferral" | "depreciation" | "inventory" | "other";
  status: "pending" | "approved" | "rejected";
}

const NewAdjustmentEntry = () => {
  const [formData, setFormData] = useState<AdjustmentFormData>({
    date: new Date().toISOString().split("T")[0],
    account: "",
    description: "",
    debit: 0,
    credit: 0,
    type: "accrual",
    status: "pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adjustment Entry Data:", formData);
    // TODO: Implement API call to save the adjustment entry
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Adjustment Entry
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                required
                type="date"
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Account</InputLabel>
                <Select
                  name="account"
                  value={formData.account}
                  onChange={handleSelectChange}
                  label="Account"
                >
                  <MenuItem value="Prepaid Rent">Prepaid Rent</MenuItem>
                  <MenuItem value="Accrued Revenue">Accrued Revenue</MenuItem>
                  <MenuItem value="Depreciation Expense">Depreciation Expense</MenuItem>
                  <MenuItem value="Inventory">Inventory</MenuItem>
                  <MenuItem value="Bad Debt Expense">Bad Debt Expense</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Financial Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Debit Amount"
                name="debit"
                value={formData.debit}
                onChange={handleChange}
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Credit Amount"
                name="credit"
                value={formData.credit}
                onChange={handleChange}
                InputProps={{
                  startAdornment: "$",
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Adjustment Type</InputLabel>
                <Select
                  name="type"
                  value={formData.type}
                  onChange={handleSelectChange}
                  label="Adjustment Type"
                >
                  <MenuItem value="accrual">Accrual</MenuItem>
                  <MenuItem value="deferral">Deferral</MenuItem>
                  <MenuItem value="depreciation">Depreciation</MenuItem>
                  <MenuItem value="inventory">Inventory</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleSelectChange}
                  label="Status"
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  component={Link}
                  href="/dashboard/adjustments"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained">
                  Create Entry
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewAdjustmentEntry; 