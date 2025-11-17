import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Alert,
  CircularProgress,
  IconButton,
  Autocomplete,
  Avatar,
} from "@mui/material";
import { useForm, Controller, set } from "react-hook-form";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface Token {
  currency: string;
  price?: number;
  date?: string;
}

interface SwapFormData {
  fromAmount: string;
  toAmount: string;
  fromCurrency: Token | null;
  toCurrency: Token | null;
}

const CurrencySwapForm: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [swapSuccess, setSwapSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SwapFormData>({
    defaultValues: {
      fromAmount: "",
      toAmount: "",
      fromCurrency: null,
      toCurrency: null,
    },
  });

  const fromAmount = watch("fromAmount");
  const fromCurrency = watch("fromCurrency");
  const toCurrency = watch("toCurrency");

  // Fetch token prices
  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        if (!response.ok) throw new Error("Failed to fetch token prices");

        const data: Token[] = await response.json();

        // Filter tokens with prices and remove duplicates
        const tokensWithPrices = data.filter(
          (token) => token.price !== undefined
        );
        const uniqueTokens = Array.from(
          new Map(
            tokensWithPrices.map((token) => [token.currency, token])
          ).values()
        );

        setTokens(
          uniqueTokens.sort((a, b) => a.currency.localeCompare(b.currency))
        );
        setError(null);
      } catch (err) {
        setError("Failed to load token prices. Please try again later.");
        console.error("Error fetching tokens:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenPrices();
  }, []);

  // Calculate exchange rate and update toAmount
  useEffect(() => {
    if (fromAmount && fromCurrency?.price && toCurrency?.price) {
      const fromValue = parseFloat(fromAmount);
      if (!isNaN(fromValue) && fromValue > 0) {
        const toValue = (fromValue * fromCurrency.price) / toCurrency.price;
        setValue("toAmount", toValue.toFixed(2));
      }
    } else {
      setValue("toAmount", "");
    }
    setSwapSuccess(false);
  }, [fromAmount, fromCurrency, toCurrency, setValue]);

  const handleSwapCurrencies = () => {
    const tempCurrency = fromCurrency;
    setValue("fromCurrency", toCurrency);
    setValue("toCurrency", tempCurrency);
    setSwapSuccess(false);
  };

  const getTokenIcon = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };

  const onSubmit = async (data: SwapFormData) => {
    setSubmitting(true);
    setSwapSuccess(false);

    // Simulate API call with 2 second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Swap Transaction:", {
      from: {
        amount: data.fromAmount,
        currency: data.fromCurrency?.currency,
        valueUSD: parseFloat(data.fromAmount) * (data.fromCurrency?.price || 0),
      },
      to: {
        amount: data.toAmount,
        currency: data.toCurrency?.currency,
        valueUSD: parseFloat(data.toAmount) * (data.toCurrency?.price || 0),
      },
      exchangeRate:
        data.fromCurrency?.price && data.toCurrency?.price
          ? (data.fromCurrency.price / data.toCurrency.price).toFixed(6)
          : "N/A",
    });

    setSubmitting(false);
    setSwapSuccess(true);
  };

  // Calculate exchange rate display
  const getExchangeRate = () => {
    if (fromCurrency?.price && toCurrency?.price) {
      const rate = fromCurrency.price / toCurrency.price;
      return `1 ${fromCurrency.currency} = ${rate.toFixed(2)} ${
        toCurrency.currency
      }`;
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Card
      elevation={6}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #3f210cff 0%, #b47b00ff 100%)",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "white", fontWeight: "bold", mb: 3 }}
        >
          Currency Swap
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {swapSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Swap transaction submitted successfully!
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ backgroundColor: "white", borderRadius: 2, p: 3 }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              From
            </Typography>

            <Controller
              name="fromCurrency"
              control={control}
              rules={{ required: "Please select a currency" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={tokens}
                  getOptionLabel={(option) => option.currency}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Avatar
                        src={getTokenIcon(option.currency)}
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {option.currency}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${option.price?.toFixed(4)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select token"
                      error={!!errors.fromCurrency}
                      helperText={errors.fromCurrency?.message}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: value && (
                          <InputAdornment position="start">
                            <Avatar
                              src={getTokenIcon(value.currency)}
                              sx={{ width: 28, height: 28 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="fromAmount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (value) => {
                  const num = parseFloat(value);
                  if (isNaN(num)) return "Invalid amount";
                  if (num <= 0) return "Amount must be greater than 0";
                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="0.00"
                  type="number"
                  inputProps={{ step: "any", min: "0" }}
                  error={!!errors.fromAmount}
                  helperText={errors.fromAmount?.message}
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: fromCurrency && (
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary">
                          ≈ $
                          {(
                            parseFloat(field.value || "0") *
                            (fromCurrency.price || 0)
                          ).toFixed(2)}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          <Box display="flex" justifyContent="center" my={2}>
            <IconButton
              onClick={handleSwapCurrencies}
              disabled={!fromCurrency || !toCurrency}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": { backgroundColor: "primary.dark" },
                "&:disabled": { backgroundColor: "grey.300" },
              }}
            >
              <SwapVertIcon />
            </IconButton>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              To
            </Typography>

            <Controller
              name="toCurrency"
              control={control}
              rules={{ required: "Please select a currency" }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  options={tokens}
                  getOptionLabel={(option) => option.currency}
                  value={value}
                  onChange={(_, newValue) => onChange(newValue)}
                  renderOption={(props, option) => (
                    <Box component="li" {...props}>
                      <Avatar
                        src={getTokenIcon(option.currency)}
                        sx={{ width: 24, height: 24, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="body1">
                          {option.currency}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${option.price?.toFixed(4)}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Select token"
                      error={!!errors.toCurrency}
                      helperText={errors.toCurrency?.message}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: value && (
                          <InputAdornment position="start">
                            <Avatar
                              src={getTokenIcon(value.currency)}
                              sx={{ width: 28, height: 28 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="toAmount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="0.00"
                  type="number"
                  disabled
                  sx={{ mt: 2 }}
                  InputProps={{
                    readOnly: true,
                    endAdornment: toCurrency && field.value && (
                      <InputAdornment position="end">
                        <Typography variant="body2" color="text.secondary">
                          ≈ $
                          {(
                            parseFloat(field.value || "0") *
                            (toCurrency.price || 0)
                          ).toFixed(2)}
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>

          {getExchangeRate() && (
            <Box
              sx={{
                backgroundColor: "grey.100",
                borderRadius: 1,
                p: 2,
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <InfoOutlinedIcon
                  sx={{ fontSize: 18, mr: 1, color: "text.secondary" }}
                />
                <Typography variant="body2" color="text.secondary">
                  Exchange Rate
                </Typography>
              </Box>
              <Typography variant="body2" fontWeight="medium">
                {getExchangeRate()}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!fromAmount || !fromCurrency || !toCurrency || submitting}
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: 2,
              color: "white",
              background:
                "linear-gradient(135deg, #3f210cff 0%, #b47b00ff 100%)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #8f5a34ff 0%, #b98b28ff 100%)",
              },
              "&:disabled": {
                background: "grey",
              },
            }}
          >
            {submitting ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>Processing...</span>
              </Box>
            ) : (
              "Confirm Swap"
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrencySwapForm;
