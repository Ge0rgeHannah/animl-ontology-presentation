import { Img, Layout, Rect, Txt, makeScene2D } from '@motion-canvas/2d';
import { all, beginSlide, createRef, waitFor } from '@motion-canvas/core';

import liverpoolLogo from '../../assets/uni-of-liverpool-logo-colour.svg';
import unileverLogo from '../../assets/unilever-logo-colour.png';

const palette = {
	background: '#FDF6E3',
	accent1: '#8DA101',
};

const collapsedSize = 120;
const collapsedRadius = 60;
const titleTopLeftX = -60;
const titleY = -400;

export function createSectionScene(
	slideId: string,
	titleText: string,
	options: {
		accentColor?: string;
		animateIntroScale?: boolean;
		transitionFromAccentColor?: string;
	} = {},
) {
	return makeScene2D(function*(view) {
		const accentBar = createRef<Rect>();
		const slideTitle = createRef<Rect>();
		const slideTitleText = createRef<Txt>();
		const accentColor = options.accentColor ?? palette.accent1;
		const initialAccentColor =
			options.transitionFromAccentColor ?? accentColor;

		view.add(
			<Rect width={1920} height={1080} fill={palette.background} fontFamily={'Raleway'}>
				<Layout x={-880} y={0}>
					<Rect
						ref={accentBar}
						width={40}
						height={1080}
						fill={initialAccentColor}
					/>
					<Rect
						ref={slideTitle}
						width={collapsedSize}
						height={collapsedSize}
						radius={collapsedRadius}
						fill={initialAccentColor}
						x={titleTopLeftX + collapsedSize / 2}
						y={titleY}
						scale={options.animateIntroScale ? 0 : 1}
					>
						<Txt
							ref={slideTitleText}
							text={titleText}
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
			</Rect>,
		);

		if (options.transitionFromAccentColor) {
			yield* all(
				accentBar().fill(accentColor, 0.3),
				slideTitle().fill(accentColor, 0.3),
			);
		}
		yield* waitFor(0.1);
		if (options.animateIntroScale) {
			yield* slideTitle().scale(1, 0.4);
		}
		const titleWidth = slideTitleText().size().x + 155;
		yield* all(
			slideTitle().width(titleWidth, 0.4),
			slideTitle().height(collapsedSize, 0.4),
			slideTitle().radius(28, 0.4),
			slideTitle().x(titleTopLeftX + titleWidth / 2, 0.4),
			slideTitleText().opacity(1, 0.4),
		);
		yield* beginSlide(slideId);

		yield* beginSlide(`${slideId}Clear`);
		yield* all(
			slideTitle().width(collapsedSize, 0.4),
			slideTitle().height(collapsedSize, 0.4),
			slideTitle().radius(collapsedRadius, 0.4),
			slideTitle().x(titleTopLeftX + collapsedSize / 2, 0.4),
			slideTitleText().opacity(0, 0.4),
		);
	});
}
