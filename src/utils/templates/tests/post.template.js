import { TemplateBuilder } from "../builder.template";

export const postTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'post')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers().cookies()
    .bodyReq()
    .assert().noErrors().status().body()
    .endAssert().endIt().endDes()
    .build();
}
