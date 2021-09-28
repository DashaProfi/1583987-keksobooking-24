function getRandomIntFromRange(min, max) {
  let result;
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    result = 'Введите корректное значение диапазона';
  }
  return result;
}
getRandomIntFromRange(7, 9);


function getRandomGeoCoordinates(min, max, num) {
  let result;
  if (min >= 0 && max > min) {
    // min = Math.ceil(min);
    // max = Math.floor(max);
    result = +(Math.random() * (max - min + 1) + min).toFixed(num);
  } else {
    result = 'Введите корректное значение диапазона';
  }
  return result;
}
getRandomGeoCoordinates(1.89, 8.456, 3);
