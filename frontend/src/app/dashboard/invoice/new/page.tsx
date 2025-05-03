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
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const NewInvoice = () => {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [client, setClient] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [invoiceDetails, setInvoiceDetails] = useState({
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    taxRate: 10,
    notes: "",
  });

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoiceItems];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
    };

    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
    }

    setInvoiceItems(newItems);
  };

  const addItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      { description: "", quantity: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * (invoiceDetails.taxRate / 100);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to save invoice
    console.log({
      client,
      invoiceDetails,
      items: invoiceItems,
      subtotal: calculateSubtotal(),
      tax: calculateTax(),
      total: calculateTotal(),
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          New Invoice
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/invoice"
        >
          Cancel
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Client Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Client Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Client Name"
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={client.address}
                  onChange={(e) => setClient({ ...client, address: e.target.value })}
                  required
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Invoice Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Invoice Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={invoiceDetails.date}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={invoiceDetails.dueDate}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tax Rate (%)"
                  type="number"
                  value={invoiceDetails.taxRate}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, taxRate: Number(e.target.value) })}
                  required
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Invoice Items */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">Items</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addItem}
              >
                Add Item
              </Button>
            </Box>
            {invoiceItems.map((item, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
                <Grid item xs={12} md={5}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, "unitPrice", Number(e.target.value))}
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    fullWidth
                    label="Total"
                    value={item.total.toFixed(2)}
                    disabled
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={1}>
                  <IconButton
                    color="error"
                    onClick={() => removeItem(index)}
                    disabled={invoiceItems.length === 1}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Summary */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box sx={{ width: 300 }}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Typography variant="body1">Subtotal</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      ${calculateSubtotal().toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Tax ({invoiceDetails.taxRate}%)</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                      ${calculateTax().toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">Total</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" align="right">
                      ${calculateTotal().toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={invoiceDetails.notes}
              onChange={(e) => setInvoiceDetails({ ...invoiceDetails, notes: e.target.value })}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                href="/dashboard/invoice"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
              >
                Create Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default NewInvoice; 