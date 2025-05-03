"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "paid" | "pending" | "overdue";
  notes: string;
}

const EditInvoice = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice>({
    id: params.id,
    invoiceNumber: "",
    client: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    items: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    status: "pending",
    notes: "",
  });

  useEffect(() => {
    // TODO: Fetch invoice data from API
    // This is mock data for demonstration
    setInvoice({
      id: params.id,
      invoiceNumber: "INV-001",
      client: {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
      },
      date: "2024-01-01",
      dueDate: "2024-01-31",
      items: [
        {
          id: "1",
          description: "Web Development",
          quantity: 1,
          unitPrice: 1000,
          total: 1000,
        },
      ],
      subtotal: 1000,
      tax: 100,
      total: 1100,
      status: "pending",
      notes: "Payment due within 30 days",
    });
  }, [params.id]);

  const handleClientChange = (field: keyof typeof invoice.client, value: string) => {
    setInvoice({
      ...invoice,
      client: {
        ...invoice.client,
        [field]: value,
      },
    });
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...invoice.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      total:
        field === "quantity" || field === "unitPrice"
          ? Number(field === "quantity" ? value : newItems[index].quantity) *
            Number(field === "unitPrice" ? value : newItems[index].unitPrice)
          : newItems[index].total,
    };

    const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1; // 10% tax rate

    setInvoice({
      ...invoice,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
          total: 0,
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    const subtotal = newItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.1;

    setInvoice({
      ...invoice,
      items: newItems,
      subtotal,
      tax,
      total: subtotal + tax,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to update invoice
    console.log("Updated invoice:", invoice);
    router.push(`/dashboard/invoice/${params.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Edit Invoice #{invoice.invoiceNumber}
        </Typography>
        <Button
          variant="outlined"
          component={Link}
          href={`/dashboard/invoice/${params.id}`}
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
                  value={invoice.client.name}
                  onChange={(e) => handleClientChange("name", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={invoice.client.email}
                  onChange={(e) => handleClientChange("email", e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={invoice.client.phone}
                  onChange={(e) => handleClientChange("phone", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  value={invoice.client.address}
                  onChange={(e) => handleClientChange("address", e.target.value)}
                  multiline
                  rows={2}
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
                  label="Invoice Date"
                  type="date"
                  value={invoice.date}
                  onChange={(e) =>
                    setInvoice({ ...invoice, date: e.target.value })
                  }
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Due Date"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) =>
                    setInvoice({ ...invoice, dueDate: e.target.value })
                  }
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={invoice.status}
                    label="Status"
                    onChange={(e) =>
                      setInvoice({
                        ...invoice,
                        status: e.target.value as Invoice["status"],
                      })
                    }
                  >
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="overdue">Overdue</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Invoice Items */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">Invoice Items</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addItem}
                variant="outlined"
                size="small"
              >
                Add Item
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item, index) => (
                    <TableRow key={item.id || index}>
                      <TableCell>
                        <TextField
                          fullWidth
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(index, "description", e.target.value)
                          }
                          required
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", Number(e.target.value))
                          }
                          required
                          sx={{ width: 100 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TextField
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) =>
                            handleItemChange(index, "unitPrice", Number(e.target.value))
                          }
                          required
                          sx={{ width: 120 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        ${item.total.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="error"
                          onClick={() => removeItem(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Summary */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-end", mt: 2 }}>
              <Typography>
                Subtotal: ${invoice.subtotal.toFixed(2)}
              </Typography>
              <Typography>
                Tax (10%): ${invoice.tax.toFixed(2)}
              </Typography>
              <Typography variant="h6">
                Total: ${invoice.total.toFixed(2)}
              </Typography>
            </Box>
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={invoice.notes}
              onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                variant="outlined"
                component={Link}
                href={`/dashboard/invoice/${params.id}`}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Update Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default EditInvoice; 