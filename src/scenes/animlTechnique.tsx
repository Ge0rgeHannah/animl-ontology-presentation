import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, waitFor } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';
import animlTechnique from '../../assets/animl_technique.png';

const palette = {
	background: '#FDF6E3',
	accent1: '#DFA000',
	text: '#5C6A72',
	border: '#D8D3BA',
	surface: '#F4F0D9',
};

const collapsedSize = 120;
const collapsedRadius = 60;
const titleTopLeftX = -60;
const titleY = -400;

export default makeScene2D(function*(view) {
	const accentBar = createRef<Rect>();
	const slideTitle = createRef<Rect>();
	const slideTitleText = createRef<Txt>();
	const imageFrame = createRef<Rect>();
	const bodyImage = createRef<Img>();

	view.add(
		<Rect width={1920} height={1080} fill={palette.background} fontFamily={'Raleway'}>
			<Layout x={-880} y={0}>
				<Rect ref={accentBar} width={40} height={1080} fill={palette.accent1} />
				<Rect
					ref={slideTitle}
					width={collapsedSize}
					height={collapsedSize}
					radius={collapsedRadius}
					fill={palette.accent1}
					x={titleTopLeftX + collapsedSize / 2}
					y={titleY}
				>
					<Txt
						ref={slideTitleText}
						text={'AnIML Ontology - Technique'}
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

			<Rect
				ref={imageFrame}
				y={60}
				width={1620}
				height={640}
				radius={12}
				fill={palette.surface}
				stroke={palette.border}
				lineWidth={4}
				clip
				opacity={0}
			>
				<Img
					ref={bodyImage}
					src={animlTechnique}
					y={0}
					height={640}
				/>
			</Rect>
		</Rect>,
	);

	yield* waitFor(0.1);
	const titleWidth = slideTitleText().size().x + 155;
	yield* all(
		slideTitle().width(titleWidth, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(28, 0.4),
		slideTitle().x(titleTopLeftX + titleWidth / 2, 0.4),
		slideTitleText().opacity(1, 0.4),
		imageFrame().opacity(1, 0.4),
	);

	yield* beginSlide('animlTechnique');
	yield* all(
		slideTitleText().opacity(0, 0.4),
		slideTitle().width(collapsedSize, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(collapsedRadius, 0.4),
		slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
		imageFrame().x(20, 0.4),
		imageFrame().y(-40, 0.4),
		imageFrame().height(800, 0.4),
	);

	yield* beginSlide('animlTechniqueClear');
	yield* all(
		slideTitle().width(collapsedSize, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(collapsedRadius, 0.4),
		slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
		slideTitleText().opacity(0, 0.4),
		imageFrame().opacity(0, 0.4),
	);
});
