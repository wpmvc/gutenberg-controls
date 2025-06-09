import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

export type PanelControlType = BaseControl & {
	type: 'panel';
	initialOpen?: boolean;
	controls: ControlsType;
};

export type PanelControlProps = BaseControlProps & {
	control: PanelControlType;
};
