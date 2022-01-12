import lottie from 'lottie-web';
import animData from './constants/animation';

const svgContainer = document.getElementById('svgContainer');
lottie.loadAnimation({
    container: svgContainer, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: JSON.parse(animData), // the path to the animation json
});
