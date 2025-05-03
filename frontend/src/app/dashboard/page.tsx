"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Avatar,
  LinearProgress,
  Box,
} from "@mui/material";
import {
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Timeline as ActivityIcon,
} from "@mui/icons-material";

const DashboardPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <PeopleIcon />
              </Avatar>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Total Users
                </Typography>
                <Typography variant="h6">1,234</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "success.main" }}>
                <MoneyIcon />
              </Avatar>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Revenue
                </Typography>
                <Typography variant="h6">$45,231</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "warning.main" }}>
                <TrendingUpIcon />
              </Avatar>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Growth
                </Typography>
                <Typography variant="h6">+12.5%</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ bgcolor: "error.main" }}>
                <ActivityIcon />
              </Avatar>
              <Box>
                <Typography color="text.secondary" variant="body2">
                  Active Now
                </Typography>
                <Typography variant="h6">573</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Recent Activity" subheader="Last 7 days" />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[1, 2, 3].map((item) => (
                <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=a042581f4e2902670${item}`}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight="medium">
                      User {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed a task
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    2h ago
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardHeader title="Progress Overview" subheader="Monthly targets" />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Sales Target</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    75%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={75} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">User Growth</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    45%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} />
              </Box>
              <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2">Revenue</Typography>
                  <Typography variant="body2" fontWeight="medium">
                    90%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={90} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardPage;