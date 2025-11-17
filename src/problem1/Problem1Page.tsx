import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FunctionsIcon from "@mui/icons-material/Functions";

import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";

interface Result {
  method: string;
  result: number | null;
  time: number;
  color: string;
  complexity: string;
  error?: string;
}

function Problem1Page() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>("5");
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState<string>("");

  const calculateAll = () => {
    const n = parseInt(inputValue);

    if (isNaN(n)) {
      setError("Please enter a valid number");
      return;
    }

    setError("");

    const newResults: Result[] = [];

    // Method A: Mathematical Formula
    try {
      const startA = performance.now();
      const resultA = sum_to_n_a(n);
      const endA = performance.now();
      newResults.push({
        method: "A: Mathematical Formula",
        result: resultA,
        time: endA - startA,
        color: "#4CAF50",
        complexity: "O(1)",
      });
    } catch (err) {
      newResults.push({
        method: "A: Mathematical Formula",
        result: null,
        time: 0,
        color: "#4CAF50",
        complexity: "O(1)",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }

    // Method B: Iterative
    try {
      const startB = performance.now();
      const resultB = sum_to_n_b(n);
      const endB = performance.now();
      newResults.push({
        method: "B: Iterative Loop",
        result: resultB,
        time: endB - startB,
        color: "#2196F3",
        complexity: "O(n)",
      });
    } catch (err) {
      newResults.push({
        method: "B: Iterative Loop",
        result: null,
        time: 0,
        color: "#2196F3",
        complexity: "O(n)",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }

    // Method C: Recursive
    try {
      const startC = performance.now();
      const resultC = sum_to_n_c(n);
      const endC = performance.now();
      newResults.push({
        method: "C: Recursive",
        result: resultC,
        time: endC - startC,
        color: "#FF9800",
        complexity: "O(n)",
      });
    } catch (err) {
      newResults.push({
        method: "C: Recursive",
        result: null,
        time: 0,
        color: "#FF9800",
        complexity: "O(n)",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }

    setResults(newResults);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateAll();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3f210cff 0%, #b47b00ff 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 3, color: "white" }}
        >
          Back to Home
        </Button>

        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{ color: "white", textAlign: "center" }}
        >
          Problem 1: Sum to N
        </Typography>
        <Typography
          variant="h5"
          sx={{ color: "rgba(255,255,255,0.9)", textAlign: "center", mb: 4 }}
        >
          Three Unique Implementations
        </Typography>

        <Card elevation={6} sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <FunctionsIcon sx={{ fontSize: 40, mr: 2, color: "#3f210cff" }} />
              <Typography variant="h5" fontWeight="bold">
                Problem Description
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              Calculate the sum of all integers from 1 to n:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                fontFamily: "monospace",
              }}
            >
              sum_to_n(n) = 1 + 2 + 3 + ... + n
            </Typography>
          </CardContent>
        </Card>

        <Card elevation={6} sx={{ mb: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Typography variant="h5" fontWeight="bold">
                Solutions
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card
                  elevation={6}
                  sx={{ borderTop: 4, borderColor: "#4CAF50" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Method A: Mathematical
                    </Typography>
                    <Typography>Uses Gauss formula: n × (n + 1) / 2</Typography>
                    <Box
                      component="pre"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                        fontSize: "0.85rem",
                      }}
                    >
                      {`function sum_to_n_a(n) {
    if (n === 0) return 0;
    if (n < 0) return -sum_to_n_a(-n);
    
    // Gauss formula
    return (n * (n + 1)) / 2;
    }`}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  elevation={6}
                  sx={{ borderTop: 4, borderColor: "#2196F3" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Method B: Iterative
                    </Typography>
                    <Typography>Uses for loop to accumulate sum</Typography>
                    <Box
                      component="pre"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                        fontSize: "0.85rem",
                      }}
                    >
                      {`function sum_to_n_b(n) {
    if (n === 0) return 0;
    
    let sum = 0;
    const absN = Math.abs(n);
    
    for (let i = 1; i <= absN; i++) {
        sum += i;
    }
    
    return n < 0 ? -sum : sum;
    }`}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  elevation={6}
                  sx={{ borderTop: 4, borderColor: "#FF9800" }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Method C: Recursive
                    </Typography>
                    <Typography>Recursive approach: n + sum(n-1)</Typography>
                    <Box
                      component="pre"
                      sx={{
                        backgroundColor: "#f5f5f5",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                        fontSize: "0.85rem",
                      }}
                    >
                      {`function sum_to_n_c(n) {
    if (n === 0) return 0;
    if (n < 0) return -sum_to_n_c(-n);
    if (n === 1) return 1;
    
    // Recursive case
    return n + sum_to_n_c(n - 1);
    }`}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card elevation={6} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Try It Out
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label="Enter a number (n)"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  error={!!error}
                  helperText={error}
                  InputProps={{
                    inputProps: { min: 0, max: 1000000 },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={calculateAll}
                  sx={{
                    height: 56,
                    background:
                      "linear-gradient(135deg, #3f210cff 0%, #b47b00ff 100%)",
                  }}
                >
                  Calculate
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <Card elevation={6} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Results for n = {inputValue}
              </Typography>
              {results[0].result !== null ? (
                <Typography variant="h4" color="primary" gutterBottom>
                  Sum = {results[0].result.toLocaleString()}
                </Typography>
              ) : (
                <Typography variant="h4" color="error" gutterBottom>
                  Error calculating sum
                </Typography>
              )}

              <Divider sx={{ my: 2 }} />

              {/* Performance Comparison */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Performance Comparison
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Method</TableCell>
                        <TableCell>Time Complexity</TableCell>
                        <TableCell align="right">Result</TableCell>
                        <TableCell align="right">Execution Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {results.map((result, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <strong>{result.method}</strong>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={result.complexity}
                                size="small"
                                sx={{
                                  backgroundColor: result.color,
                                  color: "white",
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">
                              {result.error ? (
                                <Typography
                                  variant="body2"
                                  color="error"
                                  sx={{ fontStyle: "italic" }}
                                >
                                  ❌ {result.error}
                                </Typography>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="success.main"
                                >
                                  ✓ {result.result?.toLocaleString()}
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {result.error ? (
                                <Typography
                                  variant="body2"
                                  color="text.disabled"
                                >
                                  N/A
                                </Typography>
                              ) : (
                                result.time.toFixed(4) + " ms"
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}

export default Problem1Page;
