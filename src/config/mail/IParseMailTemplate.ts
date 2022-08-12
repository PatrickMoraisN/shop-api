interface ITemplateVariable {
  [key: string]: string | number | boolean;
}

export interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}
