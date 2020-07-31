import { lazy } from 'react'

import TextField from './TextField'
import Heading from '../Heading'
import Description from '../Description'

const SingleSelect = lazy(() =>
  import('./SingleSelect' /* webpackChunkName: "Form/SingleSelect" */)
)
const MultiSelect = lazy(() =>
  import('./MultiSelect' /* webpackChunkName: "Form/MultiSelect" */)
)
const DatePicker = lazy(() =>
  import('./DatePicker' /* webpackChunkName: "Form/DatePicker" */)
)
const DateTimePicker = lazy(() =>
  import('./DateTimePicker' /* webpackChunkName: "Form/DateTimePicker" */)
)
const Checkbox = lazy(() =>
  import('./Checkbox' /* webpackChunkName: "Form/Checkbox" */)
)
const Radio = lazy(() => import('./Radio' /* webpackChunkName: "Form/Radio" */))
const Slider = lazy(() =>
  import('./Slider' /* webpackChunkName: "Form/Slider" */)
)
const TextMulti = lazy(() =>
  import('./TextMulti' /* webpackChunkName: "Form/TextMulti" */)
)
const Color = lazy(() => import('./Color' /* webpackChunkName: "Form/Color" */))

export enum FIELDS {
  text = 'text',
  singleSelect = 'singleSelect',
  multiSelect = 'multiSelect',
  date = 'date',
  dateTime = 'dateTime',
  checkbox = 'checkbox',
  radio = 'radio',
  slider = 'slider',
  textMulti = 'textMulti',
  color = 'color',

  heading = 'heading',
  description = 'description',
}

export const FIELD_COMPONENTS: Record<
  FIELDS,
  React.FC<any> | React.LazyExoticComponent<React.FC<any>>
> = {
  text: TextField,
  singleSelect: SingleSelect,
  multiSelect: MultiSelect,
  date: DatePicker,
  dateTime: DateTimePicker,
  checkbox: Checkbox,
  radio: Radio,
  slider: Slider,
  textMulti: TextMulti,
  color: Color,

  heading: Heading,
  description: Description,
}

export const DEFAULT_VALUES: Record<FIELDS, any> = {
  text: '',
  singleSelect: null,
  multiSelect: [],
  date: null,
  dateTime: null,
  checkbox: false,
  radio: '',
  slider: 0,
  textMulti: [],
  color: null,
  heading: undefined,
  description: undefined,
}
