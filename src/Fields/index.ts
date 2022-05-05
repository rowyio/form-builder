import _find from 'lodash-es/find';
import _get from 'lodash-es/get';
import { IFieldConfig } from '../types';

import ShortText from './ShortText';
import Paragraph from './Paragraph';
import Date from './Date';
import DateTime from './DateTime';
import Checkbox from './Checkbox';
import Radio from './Radio';
import SingleSelect from './SingleSelect';
import MultiSelect from './MultiSelect';
import Slider from './Slider';
import List from './List';
import Color from './Color';
import Score from './Score';
import Hidden from './Hidden';

import ContentHeader from './ContentHeader';
import ContentSubHeader from './ContentSubHeader';
import ContentParagraph from './ContentParagraph';
import ContentImage from './ContentImage';

export const FieldConfigs = [
  ShortText,
  Paragraph,
  Date,
  DateTime,
  Checkbox,
  Radio,
  SingleSelect,
  MultiSelect,
  Slider,
  List,
  Color,
  Score,
  Hidden,

  ContentHeader,
  ContentSubHeader,
  ContentParagraph,
  ContentImage,
];

/** Returns specific property of field config */
export const getFieldProp = (prop: keyof IFieldConfig, fieldType: string) => {
  const field = _find(FieldConfigs, { type: fieldType });
  return _get(field, prop);
};
