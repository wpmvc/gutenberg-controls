/**
 * Internal dependencies
 */
import { Control, ControlProps } from '../../types/control';

/**
 * Represents an item in the repeater list.
 */
export interface Item {
	id: number;
	collapsed: boolean;
	[ key: string ]: any;
}

export interface RepeaterControl extends Control {
	fixed?: boolean;
	allowDuplication?: boolean;
	hideLabel?: boolean;
	showControlInHeader?: boolean;
	labelField?: string;
	addButtonText?: boolean;
	preventEmpty?: boolean; // default: true
	controls: Control[];
	actions?: () => React.ReactElement;
	className?: string;
	showActionTooltip?: boolean;
}

export interface RepeaterProps extends ControlProps {
	control: RepeaterControl;
	[ key: string ]: any;
}

export interface SortableItemProps {
	item: Item;
	onRemove: ( id: number ) => void;
	onDuplicate: ( id: number ) => void;
	onToggleCollapse: ( id: number ) => void;
	repeaterProps: RepeaterProps;
	isDisabledRemove: boolean;
}
