import { BaseControl, BaseControlProps } from '../../types/control';

export type NumberControlType = BaseControl & {
	type: 'number';
	precision?: boolean;
	min?: number;
	max?: number;
};

export type NumberControlProps = BaseControlProps & {
	control: NumberControlType;
};
