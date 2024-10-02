export default class Coin {
  static format(
    value: number,
    locale: string = "pt-BR",
    coin: string = "BRL"
  ): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: coin,
    }).format(value);
  }
}
