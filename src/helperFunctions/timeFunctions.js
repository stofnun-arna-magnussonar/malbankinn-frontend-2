function getMonthAndYear() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}-${year}`;
  }

export default getMonthAndYear;