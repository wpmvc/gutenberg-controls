export type Control = {
	type: string;
	label: string;
	condition?: ( attributes: Record< string, any > ) => boolean;
	onChange?: ( props: Record< string, any > ) => void;
	isDisabled?: ( props: Record< string, any > ) => boolean;
	helpText?: string;
	className?: string;
	isResponsive?: boolean;
	isPro?: boolean;
};

export type SelectControl = Control & {
	options:
		| Array< { label: string; value: string; description?: string } >
		| ( (
				attributes: Record< string, any >
		  ) => Array< { label: string; value: string } > );
	isMulti?: boolean;
};

export type ControlProps = {
	attr_key: string;
	attributes: Record< string, any >;
	setAttributes: ( attributes: Record< string, any > ) => void;
	device: 'desktop' | 'tablet' | 'mobile';
	controls?: Record< string, any >;
	control: Control;
	metaData: Record< string, any >;
	clientId?: string;
	placement: 'left-start' | 'right-start';
	offset?: number;
	components: Record< string, any >;
	isProAvailable?: boolean;
};

export type SelectControlProps = ControlProps & {
	control: SelectControl;
};
