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

type PanelControl = Control & {
	initialOpen?: boolean;
	controls: Control[];
};

type PanelControlProps = ControlProps & {
	control: PanelControl;
};

export default function Panel( props: PanelControlProps ): JSX.Element {
	const { control } = props;
	return (
		<PanelBody
			title={ control.label }
			initialOpen={
				! control.label ? true : control?.initialOpen ?? false
			}
		>
			<PrivateControls { ...props } controls={ control.controls } />
		</PanelBody>
	);
}
