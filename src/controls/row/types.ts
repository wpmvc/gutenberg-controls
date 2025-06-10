import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

export type RowControlType = BaseControl & {
	type: 'row';
	controls: ControlsType;
};

export type RowControlProps = BaseControlProps & {
	control: RowControlType;
};
