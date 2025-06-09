/**
 * Internal dependencies
 */
import {
	BaseControl,
	BaseControlProps,
	ControlsType,
} from '../../types/control';

/**
 * Represents an item in the repeater list.
 */
export type Item = {
	id: number;
	collapsed: boolean;
	[ key: string ]: any;
};

export type RepeaterControlType = BaseControl & {
	type: 'repeater';
	fixed?: boolean;
	allowDuplication?: boolean;
	hideLabel?: boolean;
	showControlInHeader?: boolean;
	labelField?: string;
	addButtonText?: boolean;
	preventEmpty?: boolean; // default: true
	controls: ControlsType;
	actions?: () => React.ReactElement;
	className?: string;
	showActionTooltip?: boolean;
};

export type RepeaterControlProps = BaseControlProps & {
	control: RepeaterControlType;
	[ key: string ]: any;
};

export type SortableItemProps = {
	item: Item;
	onRemove: ( id: number ) => void;
	onDuplicate: ( id: number ) => void;
	onToggleCollapse: ( id: number ) => void;
	repeaterProps: RepeaterControlProps;
	isDisabledRemove: boolean;
};
