/**
 * WordPress dependencies
 */
import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	//@ts-ignore
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { SelectControlProps } from '../types/control';
import Label from '../components/label';
import { getValue, isDisabled, updateAttribute } from '../utils';

/**
 * External dependencies
 */
import styled from 'styled-components';
import { isFunction } from 'lodash';

const StyledToggleGroup = styled( ToggleGroupControl )< {
	isDisabled: string;
} >`
	${ ( props ) =>
		'true' === props.isDisabled &&
		`
		pointer-events: none;
		opacity: 0.5;
	` }
`;

export default function ToggleGroup( props: SelectControlProps ): JSX.Element {
	const { control, attributes } = props;
	const { options } = control;

	const toggleOptions = isFunction( options )
		? options( attributes )
		: options;

	return (
		<StyledToggleGroup
			//@ts-ignore
			label={ <Label { ...props } /> }
			isBlock
			value={ getValue( props ) }
			onChange={ ( value: any ) => updateAttribute( value, props ) }
			size="__unstable-large"
			isDisabled={ isDisabled( props ) ? 'true' : 'false' }
			className={ control?.className }
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
		</StyledToggleGroup>
	);
}
