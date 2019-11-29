import { headTestTemplate } from '../../utils/templates/tests/head.template';
import { headTemplate } from '../../utils/templates/resources/head.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'head';

export function headCli(args) {
  scenarioGenerator(args, headTemplate, headTestTemplate, METHOD);
}
