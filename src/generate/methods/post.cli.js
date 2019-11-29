import { postTemplate } from '../../utils/templates/resources/post.template';
import { postTestTemplate } from '../../utils/templates/tests/post.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'post';

export function postCli(args) {
  scenarioGenerator(args, postTemplate, postTestTemplate, METHOD);
}
