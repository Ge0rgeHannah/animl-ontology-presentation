import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';

const palette = {
	background: '#FDF6E3',
	text: '#5C6A72',
	accent1: '#8DA101',
	accent2: '#3A94C5',
};

const collapsedSize = 120;
const titleTopLeftX = -60;
const titleY = -400;

export default makeScene2D(function*(view) {
	const accentBar = createRef<Rect>();
	const slideTitle = createRef<Rect>();
	const slideTitleText = createRef<Txt>();

	view.add(
		<Rect width={1920} height={1080} fill={palette.background} fontFamily={'Raleway'}>
			<Layout x={-880} y={0}>
				<Rect ref={accentBar} width={40} height={1080} fill={palette.accent2} />
				<Rect
					ref={slideTitle}
					width={120}
					height={120}
					radius={60}
					fill={palette.accent2}
					x={titleTopLeftX + collapsedSize / 2}
					y={titleY}
				>
					<Txt
						ref={slideTitleText}
						text={'Evaluation Methods'}
						fontWeight={700}
						fontSize={64}
						fill={palette.background}
						opacity={0}
					/>
				</Rect>
			</Layout>

			<Layout x={650} y={450} direction={'row'} gap={32} alignItems={'end'} layout>
				<Img src={unileverLogo} height={98} />
				<Img src={liverpoolLogo} height={98} />
			</Layout>

			<Txt
				text={'Thank you for listening'}
				x={0}
				y={0}
				width={1280}
				fontWeight={700}
				fontSize={72}
				textWrap={true}
				textAlign={'center'}
				fill={palette.text}
			/>
		</Rect>,
	);


	yield* all(
		accentBar().fill(palette.accent1, 0.3),
		slideTitle().fill(palette.accent1, 0.3),
		slideTitle().scale(0, 0.4),
		slideTitleText().opacity(0, 0.2),
	);

	yield* beginSlide('closing');
});
