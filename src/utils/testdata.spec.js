import {emptyTestDataFromSchema} from './testdata';

const testSchema = {
  'title': 'The Root Schema',
  'id': 'http://example.com/root.json',
  'type': 'object',
  'properties': {
    'saksbehandler': {
      'title': 'The Saksbehandler Schema',
      'id': '#/properties/saksbehandler',
      'type': 'string',
      'pattern': '^(.*)$',
      'examples': [
        '',
      ],
      'default': '',
    },
    'enhet': {
      'title': 'The Enhet Schema',
      'id': '#/properties/enhet',
      'type': 'string',
      'pattern': '^(.*)$',
      'examples': [
        '',
      ],
      'default': '',
    },
  },
  'required': [
    'enhet',
    'saksbehandler',
  ],
  '$schema': 'http://json-schema.org/draft-07/schema#',
  'definitions': {},
};

it('should give an empty test data set', () => {
  const testdata = emptyTestDataFromSchema(testSchema);
  expect(testdata).toStrictEqual({
        saksbehandler: '',
        enhet: '',
      },
  );
});
