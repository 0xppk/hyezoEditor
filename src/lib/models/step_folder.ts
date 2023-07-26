import type { ScrollEffect } from '$lib/models/abstract';
import { MarqueeImage } from './marquee_image';
import { images } from '$lib/config';

type Options = {
	sticky: HTMLDivElement;
};

export class StepFolder implements ScrollEffect {
	sticky: HTMLDivElement;
	children: NodeListOf<HTMLElement> | null;
	headerHeightVh: number;
	headerOffsetHeight: number;
	scrollHandler: () => void;
	resizeHandler: () => void;

	constructor(options: Options) {
		this.sticky = options.sticky;
		this.children = null;

		this.headerHeightVh = 2;
		this.headerOffsetHeight = 0;

		// TODO: nav length 3부터 한칸씩 밀어올릴 방법 궁리하기(23.07.13)

		this.scrollHandler = this.animate.bind(this);
		this.resizeHandler = this.setup.bind(this);

		this.createMarquee();
		this.setup();
		this.scrollSetup();
		this.resizeSetup();
	}

	setup() {
		this.children = this.sticky.querySelectorAll('section');
		this.headerOffsetHeight = this.sticky.querySelector('header')!.offsetHeight;

		this.children.forEach(section => {
			const title = section.querySelector('header');
			if (title) title.style.height = `${this.headerHeightVh}vh`;
		});
	}

	scrollSetup() {
		addEventListener('scroll', this.scrollHandler);
	}

	resizeSetup() {
		addEventListener('resize', this.resizeHandler);
	}

	clearSetup() {
		removeEventListener('scroll', this.scrollHandler);
		removeEventListener('resize', this.resizeHandler);
	}

	createMarquee() {
		const newSection = document.createElement('section');
		const newDiv = document.createElement('div');
		newSection.appendChild(newDiv);
		newSection.classList.add('marquee-wrapper');
		newDiv.classList.add('marquee');

		new MarqueeImage({
			element: newDiv,
			images,
		});

		this.sticky?.appendChild(newSection);
	}

	translateSection() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * i - this.headerOffsetHeight * (i - 1),
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				contentHeight = -100 + this.headerHeightVh * i;

			const image = section.querySelector('img'),
				marquee = section.querySelector('.marquee') as HTMLDivElement;
			if (image) image.style.height = Math.abs(contentHeight) - this.headerHeightVh + '%';

			if (scrollY <= s) {
				section.style.transform = `translate3d(0, 0, 0)`;
			} else if (scrollY >= e) {
				section.style.transform = `translate3d(0, ${contentHeight}% , 0)`;
				if (marquee) marquee.style.scale = `1`;
			} else {
				section.style.transform = `translate3d(0, ${((scrollY - s) / phase) * contentHeight}%, 0)`;
				if (marquee) marquee.style.scale = `${3 - ((scrollY - s) / phase) * 2}`;
			}
		});
	}

	imageScaleUp() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight * 2,
				s = innerHeight * i + this.headerOffsetHeight * (2 - i),
				e = innerHeight * (i + 1) - this.headerOffsetHeight * i;

			const imageWrapper = section.querySelector('figure');
			if (!imageWrapper) return;

			if (scrollY <= s) {
				imageWrapper.style.transform = `scale(0)`;
			} else if (scrollY >= e) {
				imageWrapper.style.transform = 'scale(1)';
			} else {
				imageWrapper.style.transform = `scale(${(scrollY - s) / phase})`;
			}
		});
	}

	imageScaleDown() {
		this.children?.forEach((section, i) => {
			const phase = innerHeight - this.headerOffsetHeight,
				s = innerHeight * (i + 1) - this.headerOffsetHeight * i,
				e = innerHeight * (i + 2) - this.headerOffsetHeight * (i + 1);

			const imageWrapper = section.querySelector('figure');
			if (!imageWrapper) return;

			if (scrollY <= s) {
				imageWrapper.style.transformOrigin = 'right top';
			} else if (scrollY >= e) {
				imageWrapper.style.transform = 'scale(0)';
			} else {
				imageWrapper.style.transform = `scale(${1 - (scrollY - s) / phase})`;
				imageWrapper.style.transformOrigin = 'left top';
			}
		});
	}

	animate() {
		this.translateSection();
		this.imageScaleUp();
		this.imageScaleDown();
	}
}
