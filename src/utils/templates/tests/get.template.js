import { TemplateBuilder } from "../builder.template";

export const getTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'get')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers()
    .assert().noErrors().status().bodyG()
    .endAssert().endIt().endDes()
    .build();
}
