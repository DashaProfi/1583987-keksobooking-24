function getRandomIntFromRange(min, max) {
  let result;
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  }
  throw new Error('Введите корректное значение диапазона');
}
getRandomIntFromRange(1, 5);


function getRandomGeoCoordinates(min, max, num) {
  let result;
  if (min >= 0 && max > min) {
    result = +(Math.random() * (max - min) + min).toFixed(num);
    return result;
  }
  throw new Error('Введите корректное значение диапазона');
}
getRandomGeoCoordinates(1, 1.3, 2);
