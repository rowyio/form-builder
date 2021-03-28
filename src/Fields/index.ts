import _find from 'lodash/find';
import _get from 'lodash/get';
import { IFieldConfig } from '../types';

import ShortText from './ShortText';
import Paragraph from './Paragraph';
import RichText from './RichText';
import Date from './Date';
import DateTime from './DateTime';
import Checkbox from './Checkbox';
import Radio from './Radio';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import Slider from './Slider';
import List from './List';
import Color from './Color';

import ContentSection from './ContentSection';
import ContentSubHeader from './ContentSubHeader';
import ContentParagraph from './ContentParagraph';

export const FieldConfigs = [
  ShortText,
  Paragraph,
  RichText,
  Date,
  DateTime,
  Checkbox,
  Radio,
  SingleSelect,
  MultiSelect,
  Slider,
  List,
  Color,

  ContentSection,
  ContentSubHeader,
  ContentParagraph,
];

/** Returns specific property of field config */
export const getFieldProp = (prop: keyof IFieldConfig, fieldType: string) => {
  const field = _find(FieldConfigs, { type: fieldType });
  return _get(field, prop);
};
