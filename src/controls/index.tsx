/**
 * WordPress dependencies
 */
import { Fragment, ComponentType } from '@wordpress/element';

/**
 * External dependencies
 */
import { has } from 'lodash';
import { ControlProps, Control, ControlRootProps } from '../types/control';

/**
 * Internal dependencies
 */
import Checkbox from './checkbox';
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
import Repeater from './repeater';
import Notice from './notice';
import Tabs from './tabs';
import styled from 'styled-components';
import Group from './group';
import Row from './row';

/**
 * Mapping of control types to their respective components
 * Sorted by control type for consistent rendering order
 */
const defaultComponents: {
	//@ts-ignore
	[ key: string ]: ComponentType< ControlProps >;
} = {
	tabs: Tabs,
	color: PickColor,
	colors: Colors,
	group: Group,
	checkbox: Checkbox,
	border: Border,
	dimension: Dimension,
	height: Height,
	notice: Notice,
	number: Number,
	panel: Panel,
	radio: Radio,
	select: Select,
	slider: Slider,
	switch: Switch,
	text: Text,
	toggleGroup: ToggleGroup,
	repeater: Repeater,
	row: Row,
};

const StyledControls = styled.div`
	.wpmvc-field {
		&:not( .panel ),
		&:has( + :not( .panel ) ) {
			padding-bottom: 20px;
		}

		&:has( :last-child:not( .panel ) ):last-child {
			padding-bottom: 0px;
		}

		.components-panel__body {
			border-top: 0;
		}
	}
`;
/**
 * PrivateControls component that dynamically renders various control components
 * based on the `controls` prop provided.
 *
 * @param {ControlProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
export function PrivateControls( props: ControlProps ): JSX.Element | null {
	const { controls, attributes, components } = props;
	/**
	 * Memoized list of control keys to prevent unnecessary recalculation
	 * on re-renders.
	 */
	const _controls = controls ?? {};
	const controlKeys = Object.keys( _controls );

	// Early return if no controls exist
	if ( controlKeys.length === 0 ) {
		return null;
	}

	return (
		<Fragment>
			{ controlKeys.map( ( key ) => {
				const control: Control = _controls[ key ] ?? {};

				// Dynamically select the control component based on the control.type
				const ControlView = components[ control.type ];

				// If no control component exists, log an error and skip rendering
				if ( ! ControlView ) {
					console.error(
						`No control component found for type: ${ control.type }`
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
					<div
						key={ key }
						className={ `wpmvc-field ${ control.type }` }
						style={ control.style }
					>
						<ControlView
							{ ...props }
							attrKey={ key }
							control={ control }
							attributes={ attributes }
						/>
					</div>
				);
			} ) }
		</Fragment>
	);
}

/**
 * @param {ControlRootProps} props Component props
 * @returns {JSX.Element | null} Rendered control components or null
 */
export default function Controls(
	props: ControlRootProps
): JSX.Element | null {
	const { components = {} } = props;
	return (
		<StyledControls>
			{ /* @ts-ignore */ }
			<PrivateControls
				{ ...props }
				components={ { ...defaultComponents, ...components } }
			/>
		</StyledControls>
	);
}
