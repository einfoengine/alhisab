"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from "@mui/material";
import {
  Print as PrintIcon,
  Download as DownloadIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface InvoiceItem {
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
    address: string;
    email: string;
    phone: string;
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

const InvoiceDetails = () => {
  // Sample data - replace with actual API call
  const invoice: Invoice = {
    id: "1",
    invoiceNumber: "INV-2024-001",
    client: {
      name: "Acme Corp",
      address: "123 Business St, Suite 100\nNew York, NY 10001",
      email: "contact@acmecorp.com",
      phone: "(555) 123-4567",
    },
    date: "2024-03-01",
    dueDate: "2024-03-15",
    items: [
      {
        description: "Web Development Services",
        quantity: 40,
        unitPrice: 75.00,
        total: 3000.00,
      },
      {
        description: "UI/UX Design",
        quantity: 20,
        unitPrice: 100.00,
        total: 2000.00,
      },
    ],
    subtotal: 5000.00,
    tax: 500.00,
    total: 5500.00,
    status: "paid",
    notes: "Thank you for your business!",
  };

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
          >
            Download
          </Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              From
            </Typography>
            <Typography variant="body1">
              Your Company Name
              <br />
              456 Business Ave
              <br />
              New York, NY 10001
              <br />
              contact@yourcompany.com
              <br />
              (555) 987-6543
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              To
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {invoice.client.name}
              <br />
              {invoice.client.address}
              <br />
              {invoice.client.email}
              <br />
              {invoice.client.phone}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Invoice Number
            </Typography>
            <Typography variant="body1">{invoice.invoiceNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body1">{invoice.date}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body1">{invoice.dueDate}</Typography>
          </Grid>
        </Grid>

        <TableContainer sx={{ mt: 3 }}>
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
              {invoice.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    ${item.unitPrice.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    ${item.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ width: 300 }}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="body1">Subtotal</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  ${invoice.subtotal.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">Tax (10%)</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" align="right">
                  ${invoice.tax.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Total</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right">
                  ${invoice.total.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Status
          </Typography>
          <Chip
            label={invoice.status}
            color={getStatusColor(invoice.status)}
            sx={{ mt: 1 }}
          />
        </Box>

        {invoice.notes && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Notes
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {invoice.notes}
            </Typography>
          </Box>
        )}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          variant="outlined"
          component={Link}
          href="/dashboard/invoice"
        >
          Back to List
        </Button>
        <Button
          variant="contained"
          component={Link}
          href={`/dashboard/invoice/${invoice.id}/edit`}
        >
          Edit Invoice
        </Button>
      </Box>
    </Box>
  );
};

export default InvoiceDetails; 