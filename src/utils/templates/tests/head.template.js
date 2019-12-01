import { TemplateBuilder } from "../builder.template";

export const headTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'head')
  .libraries()
  .describe().it().request()
  .method(idsFormatted).headers()
  .assert().noErrors().status().emptyBody()
  .endAssert().endIt().endDes()
  .build();
}
