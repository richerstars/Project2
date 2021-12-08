import { elementsOfDom } from "./constantsElements";

elementsOfDom.divClassContainerInputRange.addEventListener('input', getInputValue);

function getInputValue(e) {
    if (e.target.type === 'range') {
        e.target.nextElementSibling.value = e.target.value;
        return;
    }
    if (e.target.type === 'number') {
        e.target.previousElementSibling.value = e.target.value;
        return;
    }
    return;
}




























// elementsOfDom.divIdRevenueMax.addEventListener('mousedown', getRightInputValue);

// function getRightInputValue(e) {
//     if (e.target.className === 'thumb-left') {
//         e.target
//     }
//     console.log(e.target);
// }


// leftThumb.addEventListener('mousedown', () => {
//     lowerVal = parseInt(lowerSlider.value);
//     upperVal = parseInt(upperSlider.value);
//     minInput.value = lowerVal;
//     maxInput.value = upperVal;
//     leftThumb.style.left = `${lowerVal}%`;
//     if (upperVal < lowerVal + 2) {
//         lowerSlider.value = upperVal - 2;

//         if (lowerVal == lowerSlider.min) {
//             upperSlider.value = 2;
//         }
//     }
// });

// rigthThumb.addEventListener('mousedown', () => {
//     lowerVal = parseInt(lowerSlider.value);
//     upperVal = parseInt(upperSlider.value);
//     minInput.value = lowerVal;
//     maxInput.value = upperVal;
//     rigthThumb.style.right = `${upperVal}%`;
//     if (upperVal < lowerVal + 2) {
//         lowerSlider.value = upperVal - 2;

//         if (lowerVal == lowerSlider.min) {
//             upperSlider.value = 2;
//         }
//     }
// });

// upperSlider.oninput = function () {
//     lowerVal = parseInt(lowerSlider.value);
//     upperVal = parseInt(upperSlider.value);
//     minInput.value = lowerVal;
//     maxInput.value = upperVal;
//     leftThumb.style.right = `${upperVal}%`;
//     rigthThumb.style.right = `${lowerVal}%`;
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
//     minInput.value = lowerVal;
//     maxInput.value = upperVal;
//     leftThumb.style.left = `${lowerVal}%`;
//     rigthThumb.style.left = `${upperVal}%`;
//     if (lowerVal > upperVal - 2) {
//         upperSlider.value = lowerVal + 2;

//         if (upperVal == upperSlider.max) {
//             lowerSlider.value = parseInt(upperSlider.max) - 2;
//         }

//     }
// };