export default function setProductsAmountEnding(amount) {
  if (amount >= 11 && amount < 20) {
    return 'товаров';
  }
  switch (true) {
    case Number(String(amount).slice(-1)) === 0:
      return 'товаров';
    case Number(String(amount).slice(-1)) === 1:
      return 'товар';
    case Number(String(amount).slice(-1)) <= 4:
      return 'товара';
    case Number(String(amount).slice(-1)) > 4:
      return 'товаров';
  }
}
