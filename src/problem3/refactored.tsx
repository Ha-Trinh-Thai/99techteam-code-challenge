import React, { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

// Mock hooks for demonstration
const useWalletBalances = (): WalletBalance[] => {
  return [];
};

const usePrices = (): Record<string, number> => {
  return {};
};

// Mock component
interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = (props) => {
  return <div>{props.amount}</div>;
};

const classes = {
  row: "wallet-row",
};

const BLOCKCHAIN_PRIORITIES: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number => {
  return BLOCKCHAIN_PRIORITIES[blockchain] ?? -99;
};

const isValidBalance = (balance: WalletBalance): boolean => {
  const priority = getPriority(balance.blockchain);
  return priority > -99 && balance.amount > 0;
};

const comparePriorities = (a: WalletBalance, b: WalletBalance): number => {
  return getPriority(b.blockchain) - getPriority(a.blockchain);
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances = useMemo(() => {
    return balances
      .filter(isValidBalance)
      .sort(comparePriorities)
      .map(
        (balance): FormattedWalletBalance => ({
          ...balance,
          formatted: balance.amount.toFixed(2),
        })
      );
  }, [balances]);

  const rows = useMemo(() => {
    return formattedBalances.map((balance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;

      return (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    });
  }, [formattedBalances, prices]);

  return <Box {...rest}>{rows}</Box>;
};

export default WalletPage;

export { isValidBalance, comparePriorities };
