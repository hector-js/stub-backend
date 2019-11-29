import { deleteTemplate } from '../../utils/templates/resources/delete.template';
import { deleteTestTemplate } from '../../utils/templates/tests/delete.template';
import { scenarioGenerator } from '../../utils/scenario-finder.cli';

const METHOD = 'delete';

export function deleteCli(args) {
  scenarioGenerator(args, deleteTemplate, deleteTestTemplate, METHOD);
}
