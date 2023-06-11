import numberFormat from '@/helpers/number-format';

export default function formatPrice(price) {
  return `${numberFormat(price)} ₽`;
}
