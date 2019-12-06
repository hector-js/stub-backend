import { TemplateBuilder } from "../builder.template";

export const putTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'put')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers().cookies()
    .bodyReq()
    .assert().noErrors().status().body()
    .endAssert().endIt().endDes()
    .build();
}
