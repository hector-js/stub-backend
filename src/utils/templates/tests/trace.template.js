import { TemplateBuilder } from "../builder.template";

export const traceTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'trace')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers()
    .assert().noErrors().status().emptyBody()
    .endAssert().endIt().endDes()
    .build();
}
