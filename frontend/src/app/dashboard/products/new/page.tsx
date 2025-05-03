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

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  status: "active" | "inactive";
  category: string;
  sku: string;
}

const NewProduct = () => {
  const [product, setProduct] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    status: "active",
    category: "",
    sku: "",
  });

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setProduct({ ...product, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save product
    console.log(product);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Product
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/products"
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
                  label="Product Name"
                  value={product.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={product.sku}
                  onChange={(e) => handleChange("sku", e.target.value)}
                  required
                  helperText="Stock Keeping Unit"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={product.category}
                    label="Category"
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <MenuItem value="Electronics">Electronics</MenuItem>
                    <MenuItem value="Accessories">Accessories</MenuItem>
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Office">Office Supplies</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={3}
                  value={product.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Pricing and Stock */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Pricing and Stock
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={product.price}
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
                  label="Stock"
                  type="number"
                  value={product.stock}
                  onChange={(e) => handleChange("stock", Number(e.target.value))}
                  required
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
                    value={product.status}
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
                href="/dashboard/products"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Product
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewProduct; 