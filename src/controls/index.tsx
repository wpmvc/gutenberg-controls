/**
 * WordPress dependencies
 */
import { useMemo, Fragment, ComponentType } from '@wordpress/element';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { ControlProps } from '../types/control';

/**
 * Internal dependencies
 */
import Checkbox from './panel';
import Border from './border';
import Dimension from './dimension';
import Height from './height';
import Number from './number';
import Panel from './panel';
import PickColor from './color-picker';
import Radio from './radio';
import Select from './select';
import Slider from './slider';
import Switch from './switch';
import Text from './text';
import Colors from './colors';
import ToggleGroup from './toggle-group';

/**
 * Mapping of control types to their respective components
 * Sorted by control type for consistent rendering order
 */
const controlGenerators: {
	//@ts-ignore
	[ key: string ]: ComponentType< ControlProps >;
} = {
	//@ts-ignore
	color: PickColor as ComponentType< ControlProps >,
	colors: Colors,
	checkbox: Checkbox,
	border: Border,
	dimension: Dimension,
	height: Height,
	number: Number,
	panel: Panel,
	//@ts-ignore
	radio: Radio as ComponentType< ControlProps >,
	select: Select,
	slider: Slider,
	switch: Switch,
	text: Text,
	toggle_group: ToggleGroup,
};

/**
 * Controls component that dynamically renders various control components
 * based on the `controls` prop provided.
 *
 * @param {ControlProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
export default function Controls( {
	controls,
	attributes,
	...props
}: ControlProps ): JSX.Element | null {
	/**
	 * Memoized list of control keys to prevent unnecessary recalculation
	 * on re-renders.
	 */
	const _controls = controls ?? {};
	const controlKeys = useMemo(
		() => Object.keys( _controls ),
		[ _controls ]
	);

	// Early return if no controls exist
	if ( controlKeys.length === 0 ) {
		return null;
	}

	return (
		<Fragment>
			{ controlKeys.map( ( key ) => {
				const control = _controls[ key ] ?? {};

				// Dynamically select the control component based on the control.type
				const ControlView = controlGenerators[ control?.type ];

				// If no control component exists, log an error and skip rendering
				if ( ! ControlView ) {
					console.error(
						`No control component found for type: ${ control?.type }`
					);
					return null;
				}

				// Skip rendering if the condition for the control is not met
				if (
					has( control, 'condition' ) &&
					control.condition &&
					! control.condition( attributes )
				) {
					return null; // Control is hidden based on the condition
				}

				// Return the actual control component with the necessary props
				return (
					<ControlView
						{ ...props }
						key={ key } // Use control key for each component to ensure uniqueness
						attr_key={ key }
						control={ control }
						attributes={ attributes }
					/>
				);
			} ) }
		</Fragment>
	);
}
