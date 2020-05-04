export const makeFirstLetterUppercase = (string) =>
  string
    .split("")
    .reduce((acc, letter, ind) => {
      const accumulator = acc;
      const letterToPush = ind === 0 ? letter.toUpperCase() : letter;
      accumulator.push(letterToPush);
      return accumulator;
    }, [])
    .join("");
