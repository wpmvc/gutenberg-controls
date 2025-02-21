/**
 * WordPress dependencies
 */
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	//@ts-ignore
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { SelectControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, updateAttribute } from '../utils';

/**
 * Internal dependencies
 */

export default function ToggleGroup( props: SelectControlProps ): JSX.Element {
	const { control } = props;
	const toggleOptions = control.options;

	return (
		<ToggleGroupControl
			//@ts-ignore
			label={
				<Label { ...props } control={ control }>
					{ control.label }
				</Label>
			}
			isBlock
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			size="__unstable-large"
		>
			{ toggleOptions.map( ( option: any, index: any ) => {
				return (
					<ToggleGroupControlOption
						key={ index }
						value={ option.value }
						label={ option.label }
					/>
				);
			} ) }
		</ToggleGroupControl>
	);
}
