import { ReactNode } from 'react';

interface ControlProps {
	attr_key: string;
	type: string;
	label: string;
	condition?: ( attributes: object ) => boolean;
	attributes: { [ key: string ]: any };
	setAttributes: ( attributes: { [ key: string ]: any } ) => void;
	is_responsive?: boolean;
	device: 'desktop' | 'tablet' | 'mobile';
	controls?: { [ key: string ]: any };
	control: { [ key: string ]: any };
	[ key: string ]: any;
}

// interface ControlsProps {
// 	control: ControlProps;
// 	attr_key: string;
// 	attributes: { [key: string]: object };
// 	device?: string;
// 	[key: string]: any;
// }

export { ControlProps };
