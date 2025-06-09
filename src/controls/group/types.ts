import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

export type GroupControlType = BaseControl & {
	type: 'group';
	controls: ControlsType;
	perRow?: number;
};

export type GroupControlProps = BaseControlProps & {
	control: GroupControlType;
};
