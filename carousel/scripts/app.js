class Carousel {
    constructor(el) {
        this.el = el;
        this.currentIndex = 0;
        this.slidesMargin = 0;
        this.initElements();
        this.initCarousel();
        this.listenEvents();
    }

    initElements() {
        this.elements = {
            prev: this.el.querySelector('[data-prev]'),
            next: this.el.querySelector('[data-next]'),
            slides: this.el.querySelector('.slides'),
        };
    }

    initCarousel() {
        this.initSlides();
    }

    initSlides() {
        this.slides = this.el.querySelectorAll('.slide');
    }

    listenEvents() {
        this.elements.prev.addEventListener('click', () => {
            if (this.currentIndex <= 0) {
                for (let i = 0; i < 3; i += 1 ) {
                    this.elements.slides.append(this.slides[i].cloneNode(true));
                }
                this.elements.slides.style.transition = 'none';
                this.slidesMargin += -(this.getSlideWidth(this.currentIndex)*(this.slides.length));
                this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
                this.currentIndex = this.slides.length;
            }

            this.slidesMargin += this.getSlideWidth(this.currentIndex - 1);
            this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
            this.currentIndex--;
            this.elements.slides.style.transition = 'all 600ms linear 0s';
        });
        this.elements.next.addEventListener('click', () => {
            if (this.currentIndex >= this.slides.length - 3) {
                for (let i = 0; i < 3; i += 1 ) {
                    this.elements.slides.append(this.slides[i].cloneNode(true));
                }
                this.elements.slides.addEventListener("transitionend", () => {
                    if (this.currentIndex >= this.slides.length) {
                        this.currentIndex = 0;
                        this.slidesMargin = 0;
                        this.elements.slides.style.transition = 'none';
                        this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
                    }
                });
            } 
            this.slidesMargin -= this.getSlideWidth(this.currentIndex);
            this.elements.slides.style.marginLeft = `${this.slidesMargin}px`;
            this.currentIndex++;
            this.elements.slides.style.transition = 'all 600ms linear 0s';
        });
    }

    getSlideWidth(index) {
        const slide = this.slides[index];
        const style = window.getComputedStyle(slide);
        const slideInnerSize = slide.getBoundingClientRect();
        return slideInnerSize.width
            + parseInt(style.marginLeft, 10)
            + parseInt(style.marginRight, 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new Carousel(document.querySelector('.carousel'));
    console.dir(carousel);
});
