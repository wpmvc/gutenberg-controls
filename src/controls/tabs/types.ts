import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

export type TabsControlType = BaseControl & {
	type: 'tabs';
	items: {
		[ key: string ]: {
			controls: ControlsType;
			icon?: JSX.Element;
			label: string;
		};
	};
};

export type TabsControlProps = BaseControlProps & {
	control: TabsControlType;
};
