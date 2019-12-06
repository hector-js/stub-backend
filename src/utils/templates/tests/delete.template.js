import { TemplateBuilder } from "../builder.template";

export const deleteTestTemplate = (args, idsFormatted) => {
  return TemplateBuilder.aTemplate(args, 'delete')
    .libraries()
    .describe().it().request()
    .method(idsFormatted).headers().cookies()
    .bodyReq()
    .assert().noErrors().status().body()
    .endAssert().endIt().endDes()
    .build();
}
