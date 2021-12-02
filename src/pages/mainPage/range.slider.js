import noUiSlider from './nouislider';
import '../../styles/nouislider.css';

const slider = document.querySelector('#budget-min-min');
export default noUiSlider.create(slider, {
    start: [0, 100],
    connect: true,
    step: 1,
    range: {
        'min': [0],
        'max': [100]
    }
});




// const 
// const lowerSlider = document.querySelector('#budget-max-min');
// const upperSlider = document.querySelector('#budget-max-max');
// let lowerVal = parseInt(lowerSlider.value);
// let upperVal = parseInt(upperSlider.value);

// upperSlider.oninput = function () {
//     lowerVal = parseInt(lowerSlider.value);
//     upperVal = parseInt(upperSlider.value);
//     console.log(lowerVal);
//     console.log(upperVal);
//     if (upperVal < lowerVal + 2) {
//         lowerSlider.value = upperVal - 2;

//         if (lowerVal == lowerSlider.min) {
//             upperSlider.value = 2;
//         }
//     }
// };


// lowerSlider.oninput = function () {
//     lowerVal = parseInt(lowerSlider.value);
//     upperVal = parseInt(upperSlider.value);

//     if (lowerVal > upperVal - 2) {
//         upperSlider.value = lowerVal + 2;

//         if (upperVal == upperSlider.max) {
//             lowerSlider.value = parseInt(upperSlider.max) - 2;
//         }

//     }
// };