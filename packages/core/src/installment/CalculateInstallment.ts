import { INSTALLMENT_MAX_QUANTITY, INTEREST_RATE_MONTHLY } from "../constants";
import Installment from "./Installment";

export default class CalculateInstallment {
  execute(
    value: number,
    installment_quantity: number = INSTALLMENT_MAX_QUANTITY,
    interest_rate: number = INTEREST_RATE_MONTHLY
  ): Installment {
    if (
      installment_quantity < 2 ||
      installment_quantity > INSTALLMENT_MAX_QUANTITY
    ) {
      throw new Error(
        `Quantidade de parcelas deve ser entre 2 e ${INSTALLMENT_MAX_QUANTITY}`
      );
    }

    const totalWithInterest = this.calculateCompoundInterest(
      value,
      interest_rate,
      installment_quantity
    );

    return {
      total_price: this.WithTwoDecimals(totalWithInterest),
      installment_price: this.WithTwoDecimals(
        totalWithInterest / installment_quantity
      ),
      installment_quantity,
      interest_rate,
    };
  }

  private calculateCompoundInterest(
    totalValue: number,
    monthly_rate: number,
    installments: number
  ) {
    return totalValue * Math.pow(1 + monthly_rate, installments);
  }

  private WithTwoDecimals(valor: number): number {
    return Math.round(valor * 100) / 100;
  }
}
