export class Utils {
  // Calculate New Balances After Transactions
  calculateBalance(
    currentBalance: number,
    transferAmount: number,
    condition: string,
  ): number {
    return condition === 's'
      ? currentBalance - transferAmount
      : currentBalance + transferAmount;
  }
}
