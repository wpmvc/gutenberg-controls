import { BaseControl, BaseControlProps } from '../../types/control';

export type SliderControlType = BaseControl & {
	type: 'slider';
	max?: number;
	min?: number;
};

export type SliderControlProps = BaseControlProps & {
	control: SliderControlType;
};
