import numberFormat from '@/helpers/number-format';

export default function renderProductPrice(price) {
  return `${numberFormat(price)} ₽`;
}
