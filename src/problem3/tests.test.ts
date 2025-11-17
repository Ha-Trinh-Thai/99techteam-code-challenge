import { describe, it, expect } from "vitest";
import { isValidBalance, comparePriorities } from "./refactored";

describe("Problem 3 - Unit Tests", () => {
  describe("isValidBalance", () => {
    it("should return true for valid balance with supported blockchain", () => {
      const balance = {
        currency: "ETH",
        amount: 10,
        blockchain: "Ethereum" as const,
      };
      expect(isValidBalance(balance)).toBe(true);
    });

    it("should return false for balance with zero amount", () => {
      const balance = {
        currency: "ETH",
        amount: 0,
        blockchain: "Ethereum" as const,
      };
      expect(isValidBalance(balance)).toBe(false);
    });

    it("should return false for balance with negative amount", () => {
      const balance = {
        currency: "ETH",
        amount: -5,
        blockchain: "Ethereum" as const,
      };
      expect(isValidBalance(balance)).toBe(false);
    });

    it("should return false for unsupported blockchain (priority -99)", () => {
      const balance = {
        currency: "BTC",
        amount: 10,
        blockchain: "Bitcoin" as any,
      };
      expect(isValidBalance(balance)).toBe(false);
    });
  });

  describe("comparePriorities", () => {
    it("should sort higher priority first (descending)", () => {
      const osmosis = {
        currency: "OSMO",
        amount: 100,
        blockchain: "Osmosis" as const,
      };
      const ethereum = {
        currency: "ETH",
        amount: 50,
        blockchain: "Ethereum" as const,
      };

      expect(comparePriorities(osmosis, ethereum)).toBeLessThan(0);
      expect(comparePriorities(ethereum, osmosis)).toBeGreaterThan(0);
    });

    it("should return 0 for equal priorities", () => {
      const zilliqa = {
        currency: "ZIL",
        amount: 20,
        blockchain: "Zilliqa" as const,
      };
      const neo = {
        currency: "NEO",
        amount: 20,
        blockchain: "Neo" as const,
      };

      expect(comparePriorities(zilliqa, neo)).toBe(0);
    });

    it("should properly sort array of balances", () => {
      const balances = [
        { currency: "ZIL", amount: 10, blockchain: "Zilliqa" as const },
        { currency: "OSMO", amount: 10, blockchain: "Osmosis" as const },
        { currency: "ETH", amount: 10, blockchain: "Ethereum" as const },
        { currency: "ARB", amount: 10, blockchain: "Arbitrum" as const },
      ];

      const sorted = [...balances].sort(comparePriorities);

      expect(sorted[0].blockchain).toBe("Osmosis");
      expect(sorted[1].blockchain).toBe("Ethereum");
      expect(sorted[2].blockchain).toBe("Arbitrum");
      expect(sorted[3].blockchain).toBe("Zilliqa");
    });
  });

  describe("Integration - Full filtering and sorting", () => {
    it("should filter out invalid balances and sort correctly", () => {
      const balances = [
        { currency: "ETH", amount: 50, blockchain: "Ethereum" as const },
        { currency: "ZIL", amount: 0, blockchain: "Zilliqa" as const }, // Should be filtered (zero)
        { currency: "OSMO", amount: 100, blockchain: "Osmosis" as const },
        { currency: "BTC", amount: 10, blockchain: "Bitcoin" as any }, // Should be filtered (unsupported)
        { currency: "ARB", amount: -5, blockchain: "Arbitrum" as const }, // Should be filtered (negative)
        { currency: "NEO", amount: 20, blockchain: "Neo" as const },
      ];

      const filtered = balances.filter(isValidBalance);
      const sorted = filtered.sort(comparePriorities);

      expect(sorted).toHaveLength(3);
      expect(sorted[0].blockchain).toBe("Osmosis");
      expect(sorted[1].blockchain).toBe("Ethereum");
      expect(sorted[2].blockchain).toBe("Neo");
    });
  });
});
