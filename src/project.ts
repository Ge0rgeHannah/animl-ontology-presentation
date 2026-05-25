import {makeProject} from '@motion-canvas/core';

import './global.css';
import animlCore from './scenes/animlCore?scene';
import animlTechnique from './scenes/animlTechnique?scene';
import animlOntology from './scenes/animlOntology?scene';
import background from './scenes/background?scene';
import closing from './scenes/closing?scene';
import evaluationMethods from './scenes/evaluationMethods?scene';
import groundTruth from './scenes/groundTruth?scene';
import ontologies from './scenes/ontologies?scene';
import ontologyEvaluation from './scenes/ontologyEvaluation?scene';
import title from './scenes/title?scene';

export default makeProject({
  scenes: [
    title,
    background,
    ontologies,
    animlOntology,
    animlCore,
    animlTechnique,
    ontologyEvaluation,
    groundTruth,
    evaluationMethods,
    closing,
  ],
});
