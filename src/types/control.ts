export interface Control {
	type: string;
	label: string;
	condition?: ( attributes: object ) => boolean;
	helpText?: string;
	className?: string;
	isResponsive?: boolean;
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
	// [ key: string ]: any;
}

export interface SelectControlProps extends ControlProps {
	control: SelectControl;
}
