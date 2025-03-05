export const handleMouseDrag = (carouselRef) => {
  const carousel = carouselRef.current;
  let isDown = false;
  let startX;
  let scrollLeft;

  const startDrag = (event) => {
    isDown = true;
    startX = event.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  };

  const moveDrag = (event) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    isDown = false;
  };

  carousel.addEventListener("mousedown", startDrag);
  carousel.addEventListener("mousemove", moveDrag);
  carousel.addEventListener("mouseup", stopDrag);
  carousel.addEventListener("mouseleave", stopDrag);

  return () => {
    carousel.removeEventListener("mousedown", startDrag);
    carousel.removeEventListener("mousemove", moveDrag);
    carousel.removeEventListener("mouseup", stopDrag);
    carousel.removeEventListener("mouseleave", stopDrag);
  };
};
