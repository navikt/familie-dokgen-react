import jsf from 'json-schema-faker';

jsf.option('useExamplesValue', true);

export const emptyTestDataFromSchema = function(schema) {
  return jsf.generate(schema);
};



