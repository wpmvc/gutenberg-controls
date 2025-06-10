import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

export type GroupControlType = BaseControl & {
	type: 'group';
	controls: ControlsType;
	isRow?: boolean;
};

export type GroupControlProps = BaseControlProps & {
	control: GroupControlType;
};
