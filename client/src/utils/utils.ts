// In real apps we will use dateJS, but this is just a minimal project
export const simpleTimeFormat = function(date: Date) {
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  return (
    leadingZero(hours) + ":" + leadingZero(minutes) + "." + leadingZero(seconds)
  );
};

const leadingZero = function(number: number): string {
  if (("" + number).length === 1) {
    return "0" + number;
  }
  return "" + number;
};
