"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import {
  Print as PrintIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface InvoiceItem {
  id: string;
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

const InvoiceDetails = ({ params }: { params: { id: string } }) => {
  const [invoice, setInvoice] = useState<Invoice>({
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

  useEffect(() => {
    // TODO: Fetch invoice data from API
  }, [params.id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "overdue":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Invoice #{invoice.invoiceNumber}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PrintIcon />}
            onClick={() => window.print()}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={() => {/* TODO: Implement download */}}
          >
            Download
          </Button>
          <Button
            variant="outlined"
            startIcon={<SendIcon />}
            onClick={() => {/* TODO: Implement send */}}
          >
            Send
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            component={Link}
            href={`/dashboard/invoice/${params.id}/edit`}
          >
            Edit
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6">Status</Typography>
                <Chip
                  label={invoice.status.toUpperCase()}
                  color={getStatusColor(invoice.status)}
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography>Date: {invoice.date}</Typography>
                <Typography>Due Date: {invoice.dueDate}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Client Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Bill To
            </Typography>
            <Typography>{invoice.client.name}</Typography>
            <Typography>{invoice.client.email}</Typography>
            <Typography>{invoice.client.phone}</Typography>
            <Typography>{invoice.client.address}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Items */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Items
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${item.unitPrice.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">${item.total.toFixed(2)}</TableCell>
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
          {invoice.notes && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Notes
              </Typography>
              <Typography>{invoice.notes}</Typography>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );
};

export default InvoiceDetails; 