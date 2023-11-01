module.exports = function format(str) {
  const words = str.split(' ');

  const formattedWords = words.map(word => {
    const lowercaseWord = word.toLowerCase();
    return lowercaseWord.charAt(0).toUpperCase() + lowercaseWord.slice(1);
  });

  return formattedWords.join(' ');
}