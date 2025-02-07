/**
 * WordPress dependencies
 */
//@ts-ignore
import { RadioControl } from '@wordpress/components';
import { getValue, updateAttribute } from '../utils';
import Label from '../components/label';
import { ControlProps } from '../types/control';

/**
 * Internal dependencies
 */

interface RadioProps extends ControlProps {
	control: {
		label: string;
		options: { label: string; value: string }[];
	};
	[ key: string ]: any; // For any other props passed into the component
}

export default function Radio( props: RadioProps ): JSX.Element {
	const { control } = props;
	const { label, options } = control || {};

	return (
		<RadioControl
			label={
				<Label { ...props } control={ control }>
					{ label }
				</Label>
			}
			options={ options }
			selected={ getValue( props ) }
			onChange={ ( value: string ) => updateAttribute( value, props ) }
		/>
	);
}
