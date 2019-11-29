import { getTestTemplate } from '../../utils/templates/tests/get.template';
import { getTemplate } from '../../utils/templates/resources/get.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'get';

export function getCli(args) {
  scenarioGenerator(args, getTemplate, getTestTemplate,METHOD )
}
