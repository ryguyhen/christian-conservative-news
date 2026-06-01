export const DAILY_BRIEF = {
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }),
  editor: "The Editor",
  body: [
    "Three threads worth watching today: a Fifth Circuit ruling on Catholic foster-care placement out of New Orleans, a Tennessee push to extend school-choice vouchers to all special-needs students, and a Pew panel showing weekly attendance among under-30s up four points since 2023.",
    "Read in any order. The cases, the legislation, and the data line up around the same question: who gets to raise, teach, and form the next generation.",
  ],
};
