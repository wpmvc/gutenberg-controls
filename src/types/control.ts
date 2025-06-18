import { CSSProperties } from 'react';
import {
	BorderControlProps,
	BorderControlType,
} from '../controls/border/types';
import {
	ColorsControlProps,
	ColorsControlType,
} from '../controls/colors/types';
import { GroupControlProps, GroupControlType } from '../controls/group/types';
import {
	NoticeControlProps,
	NoticeControlType,
} from '../controls/notice/types';
import {
	NumberControlProps,
	NumberControlType,
} from '../controls/number/types';
import { PanelControlProps, PanelControlType } from '../controls/panel/types';
import { RadioControlProps, RadioControlType } from '../controls/radio/types';
import {
	RepeaterControlProps,
	RepeaterControlType,
} from '../controls/repeater/types';
import { RowControlProps, RowControlType } from '../controls/row/types';
import {
	SelectControlProps,
	SelectControlType,
} from '../controls/select/types';
import {
	SliderControlProps,
	SliderControlType,
} from '../controls/slider/types';
import { TabsControlProps, TabsControlType } from '../controls/tabs/types';
import {
	ToggleGroupControlProps,
	ToggleGroupControlType,
} from '../controls/toggle-group/types';

// Control types
export type ControlType =
	| 'tabs'
	| 'color'
	| 'colors'
	| 'checkbox'
	| 'border'
	| 'group'
	| 'dimension'
	| 'height'
	| 'notice'
	| 'number'
	| 'panel'
	| 'radio'
	| 'select'
	| 'slider'
	| 'switch'
	| 'text'
	| 'toggleGroup'
	| 'repeater'
	| 'row';

// Options type used for select, radio, toggleGroup
export type Options =
	| Array< { label: string; value: string; description?: string } >
	| ( (
			attributes: Record< string, any >
	  ) => Array< { label: string; value: string } > );

export type Device = 'desktop' | 'tablet' | 'mobile';

// Shared base for all controls
export type BaseControl = {
	label: string;
	condition?: ( attributes: Record< string, any > ) => boolean;
	onChange?: ( props: ControlProps ) => void;
	isDisabled?: ( props: ControlProps ) => boolean;
	helpText?: string;
	className?: string;
	isResponsive?: boolean;
	isPro?: boolean;
	required?: boolean;
	style?: CSSProperties | undefined;
};

// All other control types (no options, no isMulti)
export type OtherControlType = BaseControl & {
	type:
		| 'color'
		| 'checkbox'
		| 'dimension'
		| 'height'
		| 'slider'
		| 'switch'
		| 'text';
};

// Union of all control types
export type Control =
	| BorderControlType
	| ColorsControlType
	| GroupControlType
	| NoticeControlType
	| NumberControlType
	| PanelControlType
	| RadioControlType
	| RepeaterControlType
	| RowControlType
	| SelectControlType
	| SliderControlType
	| TabsControlType
	| ToggleGroupControlType
	| OtherControlType;

// Record of control config
export type ControlsType = Record< string, Control >;

export type ControlRootProps = {
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	device?: Device;
	controls: ControlsType;
	metaData?: Record< string, any >;
	clientId?: string;
	placement?: 'left-start' | 'right-start';
	offset?: number;
	components?: Record< string, any >;
	isProAvailable?: boolean;
};
// Props shared across all controls
export type BaseControlProps = ControlRootProps & {
	attrKey: string;
	control: Record< string, any >;
	components: Record< string, any >;
};

export type CommonControlProps = BaseControlProps & {
	control: OtherControlType;
};

// Main ControlProps union
export type ControlProps =
	| BaseControlProps
	| BorderControlProps
	| ColorsControlProps
	| GroupControlProps
	| NoticeControlProps
	| NumberControlProps
	| PanelControlProps
	| RadioControlProps
	| RadioControlProps
	| RepeaterControlProps
	| RowControlProps
	| SelectControlProps
	| SliderControlProps
	| TabsControlProps
	| ToggleGroupControlProps
	| CommonControlProps;
