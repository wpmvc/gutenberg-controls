/**
 * WordPress dependencies
 */
//@ts-ignore
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { Control, ControlProps } from '../types/control';
import { PrivateControls } from '.';

interface PanelControl extends Control {
	initialOpen?: boolean;
	controls: Control[];
}

interface PanelControlProps extends ControlProps {
	control: PanelControl;
}

export default function Panel( props: PanelControlProps ): JSX.Element {
	const { control } = props;
	return (
		<PanelBody
			title={ control.label }
			initialOpen={ control?.initialOpen ?? false }
		>
			<PrivateControls { ...props } controls={ control.controls } />
		</PanelBody>
	);
}
