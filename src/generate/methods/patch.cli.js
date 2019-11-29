import { patchTemplate } from '../../utils/templates/resources/patch.template';
import { patchTestTemplate } from '../../utils/templates/tests/patch.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'patch';

export function patchCli(args) {
  scenarioGenerator(args, patchTemplate, patchTestTemplate, METHOD);
}
