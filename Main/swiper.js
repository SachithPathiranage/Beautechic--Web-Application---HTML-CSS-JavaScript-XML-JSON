const galleryContainer = document.querySelectorAll('.swiper-container');
const galleryControlsContainer = document.querySelector('.swiper-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.swiper-item');

class Carousel {
    constructor(container, items, controls) {
        this.container = Array.isArray(container) ? container : [container];
        this.controls = controls;
        this.array = [...items];
        this.descriptions = document.querySelectorAll('.description'); // Select all description elements
    }


    updateGallery() {
        this.array.forEach(el => {
            el.classList.remove('swiper-item-1');
            el.classList.remove('swiper-item-2');
            el.classList.remove('swiper-item-3');
            el.classList.remove('swiper-item-4');
            el.classList.remove('swiper-item-5');
        });

        this.array.slice(0, 5).forEach((el, i) => {
            el.classList.add(`swiper-item-${i + 1}`);
        });
    }
    updateDescriptions() {
        // Remove the 'active' class from all descriptions
        this.descriptions.forEach(description => {
            description.classList.remove('active');
        });
    
        // Find the active item (the first item in the array)
        const activeItem = this.array[2];
    
        // Find the corresponding description for the active item
        const activeDescription = activeItem.nextElementSibling;
    
        // Add the 'active' class to the corresponding description
        if (activeDescription && activeDescription.classList.contains('description')) {
            activeDescription.classList.add('active');
        }
    }
    
    
    
    setCurrentState(direction) {
        if (direction === 'previous') {
            this.array.unshift(this.array.pop());
        } else if (direction === 'next') {
            this.array.push(this.array.shift());
        }
        this.updateGallery();
        this.updateDescriptions();
    }


    setControls() {
        this.controls.forEach(control => {
            const button = document.createElement('button');
            button.className = `swiper-controls-${control}`;
            button.innerText = control;
            galleryControlsContainer.appendChild(button);
        });
    }

    useControls() {
        const previousButton = document.querySelector('.swiper-controls-previous');
        const nextButton = document.querySelector('.swiper-controls-next');

        previousButton.addEventListener('click', e => {
            e.preventDefault();
            this.setCurrentState('previous');
        });

        nextButton.addEventListener('click', e => {
            e.preventDefault();
            this.setCurrentState('next');
        });
    }

}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();
