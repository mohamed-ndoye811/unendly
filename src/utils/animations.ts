import anime from "animejs";

function cardDisappearingAnimation(callback: Function) {
    const animationTimeline = anime.timeline({
        duration: 800,
        easing: 'easeOutExpo',
        complete: () => {
            setTimeout(callback(), 1200)
        }
    });
    animationTimeline.add({
        targets: '.card-deck .card:last-of-type',
        opacity: '-200%',
        marginTop: 0
    })
}

export {
    cardDisappearingAnimation
};