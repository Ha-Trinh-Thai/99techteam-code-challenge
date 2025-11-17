import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Problem {
  id: number;
  title: string;
  description: string;
  path: string;
  color: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "Problem 1: Sum to N",
    description: "Three unique implementations of sum function",
    path: "/problem1",
    color: "#3f210cff",
  },
  {
    id: 2,
    title: "Problem 2: Currency Swap",
    description: "Interactive currency swap form with real-time rates",
    path: "/problem2",
    color: "#b47b00ff",
  },
  {
    id: 3,
    title: "Problem 3: Code Review",
    description: "Identifying inefficiencies and anti-patterns in React code",
    path: "/problem3",
    color: "#FF9800",
  },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          99Tech Code Challenge
        </Typography>

        <Grid container spacing={3}>
          {problems.map((problem) => (
            <Grid item xs={12} md={4} key={problem.id}>
              <Card
                elevation={3}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: 8,
                      backgroundColor: problem.color,
                      borderRadius: 1,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    fontWeight="bold"
                  >
                    {problem.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {problem.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate(problem.path)}
                    sx={{
                      backgroundColor: problem.color,
                      "&:hover": {
                        backgroundColor: problem.color,
                        filter: "brightness(0.9)",
                      },
                    }}
                  >
                    View Solution
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomePage;
