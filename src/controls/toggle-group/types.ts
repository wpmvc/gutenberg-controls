import { BaseControl, BaseControlProps, Options } from '../../types/control';

export type ToggleGroupControlType = BaseControl & {
	type: 'toggle_group';
	options: Options;
};

export type ToggleGroupControlProps = BaseControlProps & {
	control: ToggleGroupControlType;
};
