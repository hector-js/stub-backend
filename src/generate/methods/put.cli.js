import { putTemplate } from '../../utils/templates/resources/put.template';
import { putTestTemplate } from '../../utils/templates/tests/put.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'put';

export function putCli(args) {
  scenarioGenerator(args, putTemplate, putTestTemplate, METHOD);
}
