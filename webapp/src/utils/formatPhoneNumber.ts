//Provisoire
export default function formatPhoneNumber(number: string) {
    var cleaned = ('' + number).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4] + ' ' + match[5];
    }
    return null;
  }