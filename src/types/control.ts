export interface Control {
	type: string;
	label: string;
	condition?: ( attributes: object ) => boolean;
	isDisabled?: boolean | ( ( attributes: object ) => boolean );
	helpText?: string;
	className?: string;
	isResponsive?: boolean;
	isPro?: boolean;
}

export interface SelectControl extends Control {
	options: [ { label: string; value: string } ];
}

export interface ControlProps {
	attr_key: string;
	attributes: { [ key: string ]: any };
	setAttributes: ( attributes: { [ key: string ]: any } ) => void;
	device: 'desktop' | 'tablet' | 'mobile';
	controls?: { [ key: string ]: any };
	control: Control;
	metaData: { [ key: string ]: any };
	placement: 'left-start' | 'right-start';
	offset?: number;
	components: { [ key: string ]: any };
	isProAvailable?: boolean;
	// [ key: string ]: any;
}

export interface SelectControlProps extends ControlProps {
	control: SelectControl;
}
