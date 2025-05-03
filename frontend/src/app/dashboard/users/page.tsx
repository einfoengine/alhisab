"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  type: "admin" | "director" | "manager" | "member" | "client";
  status: "active" | "inactive";
  lastLogin: string;
}

const UsersList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - replace with actual API call
  const users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      type: "admin",
      status: "active",
      lastLogin: "2024-03-20 10:30 AM",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      type: "manager",
      status: "active",
      lastLogin: "2024-03-19 02:15 PM",
    },
    {
      id: "3",
      name: "Bob Johnson",
      email: "bob@example.com",
      type: "member",
      status: "inactive",
      lastLogin: "2024-03-18 09:45 AM",
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "admin":
        return "error";
      case "director":
        return "warning";
      case "manager":
        return "info";
      case "member":
        return "success";
      case "client":
        return "primary";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "success" : "error";
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href="/dashboard/users/new"
        >
          New User
        </Button>
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.type}
                      color={getTypeColor(user.type)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/dashboard/users/${user.id}`}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      component={Link}
                      href={`/dashboard/users/${user.id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UsersList;