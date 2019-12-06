import { TemplateBuilder } from "../builder.template";

export const patchTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'patch')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers().cookies()
    .bodyReq()
    .assert().noErrors().status().body()
    .endAssert().endIt().endDes()
    .build();
}
