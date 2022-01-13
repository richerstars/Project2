import lottie from 'lottie-web';
import animData from './constants/animation';

const svgContainer = document.getElementById('svgContainer');
lottie.loadAnimation({
    container: svgContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: JSON.parse(animData),
});
