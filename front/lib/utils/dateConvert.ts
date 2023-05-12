export const dateConvert = (jsonDate: string | undefined) => {
  if (jsonDate) {
    const date = new Date(Date.parse(jsonDate));
    return (
      date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(0, -3)
    );
  }
};
