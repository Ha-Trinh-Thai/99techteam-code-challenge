import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import { Problem1Page } from "./problem1";
import Problem2Page from "./problem2/Problem2Page";
import { Problem3Page } from "./problem3";
import HomePage from "./pages/HomePage";

const NotFound: React.FC = () => (
  <Container maxWidth="md">
    <Box sx={{ my: 8, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Page Not Found
      </Typography>
      <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
        Back to Home
      </Button>
    </Box>
  </Container>
);

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/problem1" element={<Problem1Page />} />
      <Route path="/problem2" element={<Problem2Page />} />
      <Route path="/problem3" element={<Problem3Page />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
