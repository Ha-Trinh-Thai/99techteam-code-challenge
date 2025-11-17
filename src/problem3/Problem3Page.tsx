import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Tabs,
  Tab,
  Alert,
  AlertTitle,
  Paper,
  Grid,
} from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import { Link } from "react-router-dom";
import WalletPage from "./refactored";

export default function Problem3Page() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
          ← Back to Home
        </Button>
        <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
          Problem 3: Code Review & Refactoring
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Identifying and fixing computational inefficiencies and anti-patterns
          in React code
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="fullWidth"
        >
          <Tab label="Code Comparison" />
          <Tab label="Key Improvements" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {selectedTab === 0 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Error color="error" sx={{ mr: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Original Code (With Issues)
                  </Typography>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: "#1e1e1e",
                    color: "#d4d4d4",
                    p: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    fontSize: 11,
                    fontFamily: "monospace",
                    maxHeight: "70vh",
                    lineHeight: 1.5,
                  }}
                >
                  <code>
                    {`interface WalletBalance {
  currency: string;
  amount: number;
  // ❌ Missing blockchain property
}

const WalletPageOriginal: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    // ❌ any type - no type safety
    switch (blockchain) {
      case "Osmosis": return 100;
      case "Ethereum": return 50;
      case "Arbitrum": return 30;
      case "Zilliqa": return 20;
      case "Neo": return 20;
      default: return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) { // ❌ Undefined variable
          if (balance.amount <= 0) { // ❌ Inverted logic
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // ❌ Redundant calls
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) return -1;
        else if (rightPriority > leftPriority) return 1;
        // ❌ Missing return 0
      });
  }, [balances, prices]); // ❌ Unused dependency

  // ❌ No memoization
  const formattedBalances = sortedBalances.map(
    (balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(), // ❌ No decimals
    })
  );

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount; // ❌ No null check
      return (
        <WalletRow
          className={classes.row}
          key={index} // ❌ Index as key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};`}
                  </code>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    Refactored Code (Fixed)
                  </Typography>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    bgcolor: "#1e1e1e",
                    color: "#d4d4d4",
                    p: 2,
                    borderRadius: 2,
                    overflow: "auto",
                    fontSize: 11,
                    fontFamily: "monospace",
                    maxHeight: "70vh",
                    lineHeight: 1.5,
                  }}
                >
                  <code>
                    {`// ✅ Define blockchain as union type for type safety
type Blockchain = 
  | "Osmosis" 
  | "Ethereum" 
  | "Arbitrum" 
  | "Zilliqa" 
  | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // ✅ Added
}

// ✅ Extend WalletBalance to avoid duplication
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// ✅ Priority map for O(1) lookup - defined once
const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

// ✅ Extract outside component - no recreation on every render
const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
};

// ✅ Extract filter predicate for clarity and testing
const isValidBalance = (balance: WalletBalance): boolean => {
  const priority = getPriority(balance.blockchain);
  return priority > -99 && balance.amount > 0;
};

// ✅ Extract comparator for clarity and testing
const comparePriorities = (a: WalletBalance, b: WalletBalance): number => {
  return getPriority(b.blockchain) - getPriority(a.blockchain);
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // ✅ Combine filter, sort, and format in one memoized operation
  const formattedBalances = useMemo(() => {
    return balances
      .filter(isValidBalance)
      .sort(comparePriorities)
      .map((balance): FormattedWalletBalance => ({
        ...balance,
        formatted: balance.amount.toFixed(2), // ✅ 2 decimals
      }));
  }, [balances]);

  // ✅ Memoize rows separately - only recalc when prices OR balances change
  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      // ✅ Null check with default
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
      return (
        <WalletRow
          key={balance.currency} // ✅ Unique key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]); // ✅ Correct dependencies

  return <Box {...rest}>{rows}</Box>;
};

// ✅ Export utilities for testing
export { isValidBalance, comparePriorities };`}
                  </code>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Alert severity="success">
              <AlertTitle>View Complete Code</AlertTitle>
              See detailed implementations in:{" "}
              <code>src/problem3/refactored.tsx</code>
            </Alert>
          </Grid>
        </Grid>
      )}

      {selectedTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="error"
                >
                  Critical Bugs Fixed (4)
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Added missing <code>blockchain</code> property to interface
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Fixed undefined variable <code>lhsPriority</code> →{" "}
                    <code>balancePriority</code>
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Corrected inverted filter logic (was keeping negative
                    balances)
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Added missing return statement in sort comparison
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="success.main"
                >
                  Performance Optimizations (6)
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Extracted <code>getPriority()</code> outside component (no
                    recreation)
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Used <code>BLOCKCHAIN_PRIORITIES</code> constant map for
                    lookup
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Extracted filter/sort predicates for better performance and
                    testing
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Combined operations in single memoized pass
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Added separate memoization for <code>rows</code> with
                    correct deps
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Changed from array index to unique currency keys
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="info.main"
                >
                  Type Safety Improvements (3)
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Replaced <code>any</code> type with proper{" "}
                    <code>Blockchain</code> union type
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Added null check for <code>prices</code> lookup with default
                    value
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Created <code>FormattedWalletBalance</code> interface
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                  color="warning.main"
                >
                  Code Quality Improvements (2)
                </Typography>
                <Box component="ul" sx={{ pl: 2 }}>
                  <Typography component="li" variant="body1" paragraph>
                    Added proper decimal places to <code>toFixed(2)</code>
                  </Typography>
                  <Typography component="li" variant="body1" paragraph>
                    Used Material-UI <code>Box</code> component consistently
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
