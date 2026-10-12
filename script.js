const target = document.getElementById('target');
const yes = document.getElementById('yes');
const box = document.querySelector('.box');

yes.addEventListener('click', () => {
    alert("I Like You too MI AMOR.😘🥰😍😎");
});

function moveTarget(pointerEvent) {
    const maxX = box.clientWidth - target.offsetWidth;
    const maxY = box.clientHeight - target.offsetHeight;
    const boxRect = box.getBoundingClientRect();
    const yesRect = yes.getBoundingClientRect();
    const minPointerDistance = 100;
    let nextPosition;

    for (let attempt = 0; attempt < 40; attempt += 1) {
        const left = Math.floor(Math.random() * (maxX + 1));
        const top = Math.floor(Math.random() * (maxY + 1));
        const right = left + target.offsetWidth;
        const bottom = top + target.offsetHeight;
        const overlapsYes = left + boxRect.left < yesRect.right
            && right + boxRect.left > yesRect.left
            && top + boxRect.top < yesRect.bottom
            && bottom + boxRect.top > yesRect.top;
        const farFromPointer = !pointerEvent
            || Math.hypot(
                left + boxRect.left + target.offsetWidth / 2 - pointerEvent.clientX,
                top + boxRect.top + target.offsetHeight / 2 - pointerEvent.clientY
            ) >= minPointerDistance;

        nextPosition = { left, top };
        if (!overlapsYes && farFromPointer) {
            break;
        }
    }

    target.style.left = nextPosition.left + 'px';
    target.style.top = nextPosition.top + 'px';
}

target.addEventListener('pointerenter', moveTarget);
target.addEventListener('pointerdown', moveTarget);
target.addEventListener('click', (event) => {
    event.preventDefault();
    moveTarget(event);
});

box.addEventListener('pointermove', (event) => {
    const targetRect = target.getBoundingClientRect();
    const dx = Math.max(targetRect.left - event.clientX, 0, event.clientX - targetRect.right);
    const dy = Math.max(targetRect.top - event.clientY, 0, event.clientY - targetRect.bottom);

    if (Math.hypot(dx, dy) < 80) {
        moveTarget(event);
    }
});