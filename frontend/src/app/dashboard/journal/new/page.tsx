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

interface JournalEntryFormData {
  date: string;
  description: string;
  amount: number;
  type: "debit" | "credit";
  category: string;
  status: "pending" | "approved" | "rejected";
  method: string;
  purpose: string;
  tags: string;
}

const NewJournalEntry = () => {
  const [entry, setEntry] = useState<JournalEntryFormData>({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: 0,
    type: "debit",
    category: "",
    status: "pending",
    method: "",
    purpose: "",
    tags: "",
  });

  const handleChange = (field: keyof JournalEntryFormData, value: string | number) => {
    setEntry({ ...entry, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save journal entry
    console.log(entry);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Journal Entry
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/journal"
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
                  label="Date"
                  type="date"
                  value={entry.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={entry.type}
                    label="Type"
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <MenuItem value="debit">Debit</MenuItem>
                    <MenuItem value="credit">Credit</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={entry.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Financial Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Financial Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={entry.amount}
                  onChange={(e) => handleChange("amount", Number(e.target.value))}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={entry.category}
                    label="Category"
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <MenuItem value="Revenue">Revenue</MenuItem>
                    <MenuItem value="Expenses">Expenses</MenuItem>
                    <MenuItem value="Assets">Assets</MenuItem>
                    <MenuItem value="Liabilities">Liabilities</MenuItem>
                    <MenuItem value="Equity">Equity</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Method</InputLabel>
                  <Select
                    value={entry.method}
                    label="Method"
                    onChange={(e) => handleChange("method", e.target.value)}
                  >
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="Bank">Bank</MenuItem>
                    <MenuItem value="Bikash">Bikash</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Purpose"
                  value={entry.purpose}
                  onChange={(e) => handleChange("purpose", e.target.value)}
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
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tags"
                  value={entry.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  placeholder="Enter tags separated by commas"
                  helperText="Use commas to separate multiple tags"
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
                href="/dashboard/journal"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Entry
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewJournalEntry; 