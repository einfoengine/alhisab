import React from "react";
import dynamic from "next/dynamic";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Receipt as ReceiptIcon,
  Group as GroupIcon,
  Work as WorkIcon,
  Store as StoreIcon,
  AccountTree as AccountTreeIcon,
  Balance as BalanceIcon,
  AutoFixHigh as AutoFixHighIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";

const ClientLayout = dynamic(() => import("./ClientLayout"), {
  ssr: false,
});

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, href: "/dashboard" },
  { text: "Users", icon: <PeopleIcon />, href: "/dashboard/users" },
  { text: "Projects", icon: <WorkIcon />, href: "/dashboard/projects" },
  { text: "Clients", icon: <GroupIcon />, href: "/dashboard/clients" },
  { text: "Services", icon: <StoreIcon />, href: "/dashboard/services" },
  { text: "Products", icon: <StoreIcon />, href: "/dashboard/products" },
  { text: "Invoice", icon: <ReceiptIcon />, href: "/dashboard/invoice" },
  { text: "Journal", icon: <DescriptionIcon />, href: "/dashboard/journal" },
  { text: "Ledger", icon: <AccountTreeIcon />, href: "/dashboard/ledger" },
  { text: "Trial Balance", icon: <BalanceIcon />, href: "/dashboard/trial-balance" },
  { text: "Adjustment Entries", icon: <AutoFixHighIcon />, href: "/dashboard/adjustment-entries" },
  { text: "Financial Statements", icon: <DescriptionIcon />, href: "/dashboard/financial-statements" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout menuItems={menuItems}>{children}</ClientLayout>;
}