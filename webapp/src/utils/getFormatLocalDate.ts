import format from 'date-fns/format';

export default function getFormatLocalDate(date: string, dateFormat?: string) {
  return format(new Date(date), dateFormat ? dateFormat : 'dd/MM/yyyy HH:mm:ss');
}