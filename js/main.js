
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomInteger = (minimalInteger, maximalInteger) => {
	minimalInteger = Math.ceil(minimalInteger);
	maximalInteger = Math.floor(maximalInteger);

	return minimalInteger < 0 ? 'Неприемлимо отрицательное значение' :
		maximalInteger <= minimalInteger ? 'Максимальное значение не должно быть меньше или быть равно минимальному значению' :
		Math.floor(Math.random() * (maximalInteger - minimalInteger + 1)) + minimalInteger;
};