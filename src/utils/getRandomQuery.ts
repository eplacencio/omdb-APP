export function getRandomQuery() {
  const options = ['batman', 'avengers', 'star wars'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}