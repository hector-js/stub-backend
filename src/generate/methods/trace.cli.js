import { traceTestTemplate } from '../../utils/templates/tests/trace.template';
import { traceTemplate } from '../../utils/templates/resources/trace.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'trace';

export function traceCli(args) {
  scenarioGenerator(args, traceTemplate, traceTestTemplate,METHOD);
}
