import { BaseControl, BaseControlProps, Options } from '../../types/control';

export type ToggleGroupControlType = BaseControl & {
	type: 'toggleGroup';
	options: Options;
};

export type ToggleGroupControlProps = BaseControlProps & {
	control: ToggleGroupControlType;
};
