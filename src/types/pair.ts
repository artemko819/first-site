export type Pair = {
  available: boolean | null,
  from: Currency,
  to: Currency,
  id: string,
  isSelected: number,
  max: number
  min: number,
  name: string,
  percent: number,
}

export type Currency = {
  id: string,
  name: string,
  network: string | null,
  symbol: string,
  price: number,
  available: number | null,
}

export type CurrencyFrom =  Currency & {
  max: number | null,
  min: number | null,
}
