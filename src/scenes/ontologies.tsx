import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, waitFor } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';
import allotropLogo from '../../assets/AllotropeLogo.png';

const palette = {
	background: '#FDF6E3',
	text: '#5C6A72',
	accent1: '#8DA101',
};

const collapsedSize = 120;
const collapsedRadius = 60;
const titleTopLeftX = -60;
const titleY = -400;

export default makeScene2D(function*(view) {
	const accentBar = createRef<Rect>();
	const slideTitle = createRef<Rect>();
	const slideTitleText = createRef<Txt>();
	const question = createRef<Txt>();
	const allotrope = createRef<Img>();
	const slideText1 = createRef<Layout>();

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
						text={'Ontologies'}
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
				ref={question}
				text={'Why not reuse an exisiting ontology?'}
				x={0}
				y={60}
				width={1400}
				fontSize={72}
				lineHeight={62}
				textAlign={'center'}
				textWrap={true}
				fill={palette.text}
				opacity={0}
			/>

			<Layout
				ref={slideText1}
				x={0}
				y={60}
				width={1500}
				direction={'column'}
				gap={42}
				alignItems={'start'}
				opacity={0}
				layout
			>
				<Txt
					text={'• Ontologies are crucial to this task as they faciliate reasoning across a knowledge base'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• There are existing ontologies that represent a similar domain'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Differences in perspective mean mapping the data to these ontologies would lead to a loss of knowledge'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Not all candidate ontologies are open source'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
			</Layout>

			<Img
				ref={allotrope}
				opacity={0}
				src={allotropLogo}
				height={100}
				y={380}
			/>
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
		question().opacity(1, 0.4),
	);

	yield* beginSlide('ontologies');
	yield* all(
		question().y(-300, 0.4),
		question().fontSize(48, 0.4),
		slideText1().opacity(1, 0.4),
		allotrope().opacity(1, 0.4),
	);

	yield* beginSlide('ontologiesClear');
	yield* all(
		slideTitle().width(collapsedSize, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(collapsedRadius, 0.4),
		slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
		slideTitleText().opacity(0, 0.4),
		question().opacity(0, 0.4),
		slideText1().opacity(0, 0.4),
		allotrope().opacity(0, 0.4),
	);
});
