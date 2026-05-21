import { Img, Layout, Line, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, waitFor } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';
import animlData from '../../assets/AnIMLdata.png';
import animlSchema from '../../assets/AnIMLschema.png';
import unileverKG from '../../assets/UnileverKG.png';
import ontology from '../../assets/ontology.png';

const palette = {
	background: '#FDF6E3',
	text: '#5C6A72',
	accent1: '#8DA101',
	border: '#D8D3BA',
	surface: '#F4F0D9',
	blue: '#3A94C5',
};

const collapsedSize = 120;
const collapsedRadius = 60;
const titleTopLeftX = -60;
const titleY = -400;

export default makeScene2D(function*(view) {
	const accentBar = createRef<Rect>();
	const slideTitle = createRef<Rect>();
	const slideTitleText = createRef<Txt>();
	const slideText1 = createRef<Txt>();
	const slideText2 = createRef<Txt>();
	const kGIMG = createRef<Layout>();
	const ontoIMG = createRef<Layout>();

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
					scale={0}
				>
					<Txt
						ref={slideTitleText}
						text={'Background'}
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
				ref={slideText1}
				x={0}
				y={60}
				width={1500}
				direction={'column'}
				gap={64}
				alignItems={'start'}
				opacity={0}
				layout
			>
				<Txt
					text={'• Robots are a crucial component of modern product development and testing workflows'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• During experiments, these robots generate log data'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Unilever store this data in an XML based format AnIML'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• The implicit semantics present in the AnIML schema present an obstacle for interoperability between labs'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
			</Layout>

			<Layout
				ref={slideText2}
				x={0}
				y={60}
				width={1500}
				direction={'column'}
				gap={64}
				alignItems={'start'}
				opacity={0}
				layout
			>
				<Txt
					text={'• Knowledge Graphs provide a way of achieving this interoperability'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Knowledge graphs represent knowledge through a set of triples (or facts) in the form of subject, predicate, object'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'ani:SampleSet ani:hasMember ani:Sample'}
					fontSize={42}
					width={1500}
					textAlign={'center'}
					fontFamily={'Noto Sans Mono'}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
				<Txt
					text={'• Ontologies are a type of schema used to define the relationships between concepts'}
					fontSize={42}
					lineHeight={58}
					textWrap={true}
					fill={palette.text}
				/>
			</Layout>
			<Layout
				ref={kGIMG}
				opacity={0}
				width={1500}
				direction={'row'}
				gap={64}
				alignItems={'center'}
				justifyContent={'center'}
				layout
			>
				<Img src={animlData} height={300} />
				<Line
					points={[
						[-70, 0],
						[70, 0],
					]}
					stroke={palette.accent1}
					lineWidth={8}
					endArrow
					arrowSize={20}
				/>
				<Img src={unileverKG} height={300} />
			</Layout>
			<Layout
				ref={ontoIMG}
				opacity={0}
				width={1500}
				direction={'row'}
				gap={64}
				y={-150}
				alignItems={'center'}
				justifyContent={'center'}
				layout
			>
				<Img src={animlSchema} height={300} />
				<Line
					points={[
						[-70, 0],
						[70, 0],
					]}
					stroke={palette.accent1}
					lineWidth={8}
					endArrow
					arrowSize={20}
				/>
				<Img src={ontology} height={300} />
			</Layout>
		</Rect>,
	);

	yield* waitFor(0.1);
	yield* slideTitle().scale(1, 0.4);
	const titleWidth = slideTitleText().size().x + 155;
	yield* all(
		slideTitle().width(titleWidth, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(28, 0.4),
		slideTitle().x(titleTopLeftX + titleWidth / 2, 0.4),
		slideTitleText().opacity(1, 0.4),
		slideText1().opacity(1, 0.4),
	);

	yield* beginSlide('background');
	yield* slideText1().opacity(0, 0.4);
	yield* slideText2().opacity(1, 0.4);

	yield* beginSlide('task 1');
	yield* slideText2().opacity(0, 0.4);
	yield* kGIMG().opacity(1, 0.4);

	yield* beginSlide('task 2');
	yield* all(
		kGIMG().y(150, 0.4),
		ontoIMG().opacity(1, 0.4),
	);

	yield* beginSlide('backgroundClear');
	yield* all(
		slideTitle().width(collapsedSize, 0.4),
		slideTitle().height(collapsedSize, 0.4),
		slideTitle().radius(collapsedRadius, 0.4),
		slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
		slideTitleText().opacity(0, 0.4),
		kGIMG().opacity(0, 0.4),
		ontoIMG().opacity(0, 0.4),
	);
});
