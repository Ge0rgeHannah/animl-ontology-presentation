import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, waitFor } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';

const palette = {
	background: '#FDF6E3',
	text: '#5C6A72',
	accent1: '#DFA000',
};

const collapsedSize = 120;
const collapsedRadius = 60;
const titleTopLeftX = -60;
const titleY = -400;

export default makeScene2D(function*(view) {
	const accentBar = createRef<Rect>();
	const slideTitle = createRef<Rect>();
	const slideTitleText = createRef<Txt>();
	const bodyText = createRef<Layout>();

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
						text={'AnIML Ontology Evaluation'}
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

			<Layout
				ref={bodyText}
				x={0}
				y={90}
				width={1480}
				direction={'column'}
				gap={52}
				alignItems={'start'}
				opacity={0}
				layout
			>
				<Txt
					text={'• Source Schema Coverage'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Competency Questions'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Negative Competenecy Questions'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
			</Layout>
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
		bodyText().opacity(1, 0.4),
	);
	//yield* beginSlide('ontologyEvaluation');

	yield* beginSlide('ontologyEvaluationClear');
	yield* all(
		slideTitle().width(collapsedSize, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(collapsedRadius, 0.4),
		slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
		slideTitleText().opacity(0, 0.4),
		bodyText().opacity(0, 0.4),
	);
});
