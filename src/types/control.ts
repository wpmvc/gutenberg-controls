// Control types
export type ControlType =
	| 'tabs'
	| 'color'
	| 'colors'
	| 'checkbox'
	| 'border'
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
	| 'toggle_group'
	| 'repeater';

// Options type used for select, radio, toggle_group
export type Options =
	| Array< { label: string; value: string; description?: string } >
	| ( (
			attributes: Record< string, any >
	  ) => Array< { label: string; value: string } > );

// Shared base for all controls
export type ControlBase = {
	label: string;
	condition?: ( attributes: Record< string, any > ) => boolean;
	onChange?: ( props: Record< string, any > ) => void;
	isDisabled?: ( props: Record< string, any > ) => boolean;
	helpText?: string;
	className?: string;
	isResponsive?: boolean;
	isPro?: boolean;
	required?: boolean;
};

// Controls with required options
export type SelectControlType = ControlBase & {
	type: 'select';
	options: Options;
	isMulti?: boolean;
};

export type ToggleGroupControlType = ControlBase & {
	type: 'toggle_group';
	options: Options;
};

export type RadioControlType = ControlBase & {
	type: 'radio';
	options: Options;
};

// All other control types (no options, no isMulti)
export type OtherControlType = ControlBase & {
	type:
		| 'tabs'
		| 'color'
		| 'colors'
		| 'checkbox'
		| 'border'
		| 'dimension'
		| 'height'
		| 'notice'
		| 'number'
		| 'panel'
		| 'slider'
		| 'switch'
		| 'text'
		| 'repeater';
};

// Union of all control types
export type Control =
	| SelectControlType
	| ToggleGroupControlType
	| RadioControlType
	| OtherControlType;

// Record of control config
export type ControlsType = Record< string, Control >;

// Props shared across all controls
export type CommonControlProps = {
	attr_key: string;
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	device: 'desktop' | 'tablet' | 'mobile';
	controls: ControlsType;
	metaData: Record< string, any >;
	clientId?: string;
	placement: 'left-start' | 'right-start';
	offset?: number;
	components: Record< string, any >;
	isProAvailable?: boolean;
};

// Typed props for each specific control
export type SelectControlProps = CommonControlProps & {
	control: SelectControlType;
};

export type ToggleGroupControlProps = CommonControlProps & {
	control: ToggleGroupControlType;
};

export type RadioControlProps = CommonControlProps & {
	control: RadioControlType;
};

export type OtherControlProps = CommonControlProps & {
	control: OtherControlType;
};

// Main ControlProps union
export type ControlProps =
	| SelectControlProps
	| ToggleGroupControlProps
	| RadioControlProps
	| OtherControlProps;
