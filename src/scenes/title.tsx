import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { beginSlide, createRef, all } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';

const palette = {
	background: '#FDF6E3',
	text: '#5C6A72',
	accent1: '#8DA101',
};

export default makeScene2D(function*(view) {
	const title = createRef<Txt>();
	const authors = createRef<Txt>();

	view.add(
		<Rect width={1920} height={1080} fill={palette.background} fontFamily={'Raleway'}>
			<Layout x={-880} y={0}>
				<Rect
					width={40}
					height={1080}
					fill={palette.accent1}
				/>
			</Layout>

			<Layout x={650} y={450} direction={'row'} gap={32} alignItems={'end'} layout>
				<Img src={unileverLogo} height={98} />
				<Img src={liverpoolLogo} height={98} />
			</Layout>

			<Txt
				ref={title}
				text={'The AnIML Ontology: Enabling Semantic Interoperability for Large-Scale Experimental Data in Interconnected Scientific Labs'}
				x={0}
				y={-40}
				width={1280}
				fontWeight={700}
				fontSize={60}
				textWrap={true}
				textAlign={'center'}
				fill={palette.text}
			/>
			<Txt
				ref={authors}
				text={'Wilf Morlidge, Elliot Watkins-Leek, George Hannah, Harry Rostron, Andrew Ng, Ewan Johnson, Andrew Mitchell, Terry R. Payne, Valentina Tamma, Jacopo de Berardinis'}
				x={0}
				y={160}
				width={1280}
				fontWeight={400}
				fontSize={36}
				textWrap={true}
				textAlign={'center'}
				fill={palette.text}
			/>
		</Rect>,
	);

	yield* beginSlide('title');
	yield* all(
		title().opacity(0, 0.4),
		authors().opacity(0, 0.4),
	);
});
