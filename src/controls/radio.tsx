/**
 * WordPress dependencies
 */
//@ts-ignore
import { RadioControl } from '@wordpress/components';
import { getValue, updateAttribute } from '../utils';
import Label from '../components/label';
import { SelectControlProps } from '../types/control';

export default function Radio( props: SelectControlProps ): JSX.Element {
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
