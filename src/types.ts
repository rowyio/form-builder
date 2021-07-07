import { UseFormReturn, UseControllerReturn } from 'react-hook-form';
import { FieldType } from './constants/fields';
import { GridProps } from '@material-ui/core';

export type Field = {
  type: FieldType | string;
  name?: string;

  label?: string;
  assistiveText?: string;

  conditional?: 'check' | 'option';
  displayCondition?: string;
  required?: boolean;
  disabled?: boolean;
  validation?: any[][];

  defaultValue?: any;
  gridCols?: GridProps['xs'];
  disablePadding?: boolean;

  [key: string]: any;
};
export type Fields = Field[];

export interface IFieldComponentProps extends UseControllerReturn {
  index: number;
  name: string;
  useFormMethods: UseFormReturn;

  label: string;
  errorMessage?: string;
  assistiveText?: string;

  required?: boolean;
  disabled?: boolean;

  [key: string]: any;
}

export type CustomComponent<
  P extends IFieldComponentProps = IFieldComponentProps
> = React.ComponentType<P> | React.LazyExoticComponent<React.ComponentType<P>>;

export type CustomComponents<
  P extends IFieldComponentProps = IFieldComponentProps
> = {
  [type: string]: {
    component: CustomComponent<P>;
    defaultValue?: any;
    validation?: any[][];
  };
};

export interface IFieldConfig<
  P extends IFieldComponentProps = IFieldComponentProps
> {
  type: string;
  name: string;
  group: 'input' | 'content';
  icon: React.ReactNode;
  dataType: string;
  defaultValue: any;
  component: CustomComponent<P>;
  settings: Fields;
  validation: (config: Record<string, any>) => any[][];
}
