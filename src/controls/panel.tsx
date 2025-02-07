/**
 * WordPress dependencies
 */
//@ts-ignore
import { PanelBody } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { ControlProps } from '../types/control';
import Controls from '.';

export default function Panel( props: ControlProps ): JSX.Element {
	const { control } = props;
	return (
		<PanelBody
			title={ control.label }
			initialOpen={ control?.initialOpen ?? false }
		>
			<Controls { ...props } controls={ control.controls } />
		</PanelBody>
	);
}
