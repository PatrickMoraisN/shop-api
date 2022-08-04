interface ITemplateVariable {
  [key: string]: string | number | boolean;
}

export interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}
