import { useCallback, memo } from '@wordpress/element';
import {
	DndContext,
	closestCenter,
	useSensor,
	useSensors,
	PointerSensor,
	KeyboardSensor,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
	arrayMove,
	useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { X, Copy, GripVertical } from 'lucide-react';
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
	restrictToFirstScrollableAncestor,
} from '@dnd-kit/modifiers';
//@ts-ignore
import { Button } from '@wordpress/components';
import { Control, ControlProps } from '../../types/control';
import { PrivateControls } from '..';
import { findIndex, isEmpty } from 'lodash';

import {
	Action,
	ButtonContainer,
	Container,
	ItemContainer,
	ItemHeader,
	ItemHeaderActions,
	ItemHeaderContent,
	ItemList,
	Label as StyledLabel,
	SortButton,
} from './style';
import Label from '../../components/label';
/**
 * Represents an item in the repeater list.
 * @interface Item
 * @property {number} id - Unique identifier for the item.
 * @property {boolean} collapsed - Whether the item is collapsed or expanded.
 * @property {string} [key: string] - Additional properties for the item.
 */
interface Item {
	id: number;
	collapsed: boolean;
	[ key: string ]: any;
}

/**
 * Props for the Repeater component.
 * @interface RepeaterProps
 * @extends ControlProps
 * @property {Object} control - Control configuration object.
 * @property {Object} attributes - Attributes object containing the repeater data.
 * @property {string} attr_key - Key to access the repeater data in the attributes object.
 * @property {Function} setAttributes - Function to update attributes.
 * @property {any} [key: string] - Additional props.
 */

interface RepeaterControl extends Control {
	fixed?: boolean;
	allowDuplication?: boolean;
	labelField?: string;
	addButtonText?: boolean;
	controls: Control[];
}

interface RepeaterProps extends ControlProps {
	control: RepeaterControl;
	[ key: string ]: any;
}

function getMaxId( attribute: Item[] ) {
	return attribute.reduce(
		( max: number, item: Item ) => ( item.id > max ? item.id : max ),
		0
	);
}

/**
 * A reusable Repeater component that allows users to add, remove, duplicate, and reorder items.
 * Items can be collapsed/expanded and are draggable for reordering.
 * @component
 * @param {RepeaterProps} props - Props for the Repeater component.
 * @returns {JSX.Element} The rendered Repeater component.
 */
export default function Repeater( props: RepeaterProps ) {
	const { control, attributes, attr_key, setAttributes } = props;
	const attribute = attributes[ attr_key ];

	const sensors = useSensors(
		useSensor( PointerSensor ),
		useSensor( KeyboardSensor )
	);

	/**
	 * Handles the end of a drag event to reorder items.
	 * @param {DragEndEvent} event - The drag end event.
	 */
	const handleDragEnd = useCallback(
		( event: DragEndEvent ) => {
			const { active, over } = event;
			if ( ! over || active.id === over.id ) return;
			const oldIndex = attribute.findIndex(
				( item: Item ) => item.id === active.id
			);
			const newIndex = attribute.findIndex(
				( item: Item ) => item.id === over.id
			);
			const newAttributes = arrayMove( attribute, oldIndex, newIndex );
			setAttributes( { [ attr_key ]: newAttributes } );
		},
		[ attribute, setAttributes, attr_key ]
	);

	/**
	 * Adds a new item to the repeater list.
	 */
	const addItem = useCallback( () => {
		const newItem = {
			id: getMaxId( attribute ) + 1,
			label: 'New Item',
			value: 'New Value',
			collapsed: true,
		};
		const newAttributes = [ ...attribute, newItem ];
		setAttributes( { [ attr_key ]: newAttributes } );
	}, [ attribute, setAttributes, attr_key ] );

	/**
	 * Removes an item from the repeater list by its ID.
	 * @param {number} id - The ID of the item to remove.
	 */
	const removeItem = useCallback(
		( id: number ) => {
			const newAttributes = attribute.filter(
				( item: Item ) => item.id !== id
			);
			setAttributes( { [ attr_key ]: newAttributes } );
		},
		[ attribute, setAttributes, attr_key ]
	);

	/**
	 * Duplicates an item in the repeater list by its ID.
	 * @param {number} id - The ID of the item to duplicate.
	 */
	const duplicateItem = useCallback(
		( id: number ) => {
			const itemToDuplicate = attribute.find(
				( item: Item ) => item.id === id
			);
			if ( itemToDuplicate ) {
				const newItem = {
					...itemToDuplicate,
					id: getMaxId( attribute ) + 1,
				};
				const newAttributes = [ ...attribute, newItem ];
				setAttributes( { [ attr_key ]: newAttributes } );
			}
		},
		[ attribute, setAttributes, attr_key ]
	);

	/**
	 * Toggles the collapsed state of an item by its ID.
	 * @param {number} id - The ID of the item to toggle.
	 */
	const toggleCollapse = useCallback(
		( id: number ) => {
			const newAttributes = attribute.map( ( item: Item ) =>
				item.id === id ? { ...item, collapsed: ! item.collapsed } : item
			);
			setAttributes( { [ attr_key ]: newAttributes } );
		},
		[ attribute, setAttributes, attr_key ]
	);

	return (
		<div className="components-base-control wpmvc-repeater-wrapper">
			<StyledLabel className="repeater-label">
				<Label { ...props } />
			</StyledLabel>
			<Container className="repeater-container">
				<DndContext
					sensors={ sensors }
					collisionDetection={ closestCenter }
					onDragEnd={ handleDragEnd }
					modifiers={ [
						restrictToVerticalAxis,
						restrictToWindowEdges,
						restrictToFirstScrollableAncestor,
					] }
				>
					<SortableContext
						items={ attribute }
						strategy={ verticalListSortingStrategy }
					>
						<ItemList className="repeater-item-list">
							{ attribute.map( ( item: Item ) => (
								//@ts-ignore
								<SortableItem
									key={ item.id }
									item={ item }
									repeaterProps={ props }
									onRemove={ removeItem }
									onDuplicate={ duplicateItem }
									onToggleCollapse={ toggleCollapse }
								/>
							) ) }
						</ItemList>
					</SortableContext>
				</DndContext>
				{ ! control?.fixed && (
					<ButtonContainer className="repeater-button-container">
						<Button
							onClick={ addItem }
							variant="primary"
							size="small"
						>
							{ control?.addButtonText
								? control.addButtonText
								: '+ ADD ITEM' }
						</Button>
					</ButtonContainer>
				) }
			</Container>
		</div>
	);
}

/**
 * Props for the SortableItem component.
 * @interface SortableItemProps
 * @property {Item} item - The item to render.
 * @property {Function} onRemove - Function to remove the item.
 * @property {Function} onDuplicate - Function to duplicate the item.
 * @property {Function} onToggleCollapse - Function to toggle the item's collapsed state.
 * @property {RepeaterProps} repeaterProps - Props passed from the Repeater component.
 */
interface SortableItemProps {
	item: Item;
	onRemove: ( id: number ) => void;
	onDuplicate: ( id: number ) => void;
	onToggleCollapse: ( id: number ) => void;
	repeaterProps: RepeaterProps;
}

/**
 * A draggable and sortable item component used within the Repeater.
 * @component
 * @param {SortableItemProps} props - Props for the SortableItem component.
 * @returns {JSX.Element} The rendered SortableItem component.
 */
const SortableItem = memo(
	( {
		item,
		onRemove,
		onDuplicate,
		onToggleCollapse,
		repeaterProps,
	}: SortableItemProps ) => {
		const {
			attributes: dragAttributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable( { id: item.id } );

		const { attr_key, attributes, control, setAttributes } = repeaterProps;
		const attribute = attributes[ attr_key ];
		const itemIndex = findIndex( attribute, { id: item.id } );

		return (
			<ItemContainer
				ref={ setNodeRef }
				style={ {
					transform: CSS.Transform.toString( transform ),
					transition,
				} }
				dragging={ isDragging ? 1 : 0 }
				className="repeater-item"
			>
				<ItemHeader
					fixed={
						control?.fixed ? control.fixed.toString() : 'false'
					}
					onClick={ () => onToggleCollapse( item.id ) }
					className="repeater-header"
				>
					<ItemHeaderContent className="repeater-header-content">
						<SortButton
							{ ...listeners }
							{ ...dragAttributes }
							className="repeater-sort-button"
						>
							<GripVertical size={ 16 } />
						</SortButton>
						<span
							style={ {
								fontWeight: 500,
								color: '#1e1e1e',
								padding: '9px 0px',
							} }
						>
							{ item[ control?.labelField ?? 'defaultField' ] ??
								`Item #${ item.id }` }
						</span>
					</ItemHeaderContent>
					{ ! control?.fixed && (
						<ItemHeaderActions className="header-actions">
							{ ( undefined === control?.allowDuplication ||
								control.allowDuplication ) && (
								<Action
									onClick={ ( event ) => {
										event.stopPropagation();
										onDuplicate( item.id );
									} }
									className="copy"
								>
									<Copy size={ 16 } />
								</Action>
							) }
							<Action
								onClick={ ( event ) => {
									event.stopPropagation();
									onRemove( item.id );
								} }
								className="remove"
							>
								<X size={ 16 } />
							</Action>
						</ItemHeaderActions>
					) }
				</ItemHeader>
				{ ! isEmpty( control.controls ) && ! item.collapsed && (
					<div
						style={ {
							padding: 10,
							borderTop: '1px solid #e0e0e0',
						} }
						className="repeater-item-content"
					>
						<PrivateControls
							{ ...repeaterProps }
							attributes={ attribute[ itemIndex ] }
							setAttributes={ ( newAttributes ) => {
								const updatedValues = [ ...attribute ];

								updatedValues[ itemIndex ] = {
									...updatedValues[ itemIndex ],
									...newAttributes,
								};

								setAttributes( {
									[ attr_key ]: updatedValues,
								} );

								if ( control?.onChange ) {
									control.onChange( {
										...repeaterProps,
										updatedValues,
										repeaterIndex: itemIndex,
									} );
								}
							} }
							controls={ control.controls }
						/>
					</div>
				) }
			</ItemContainer>
		);
	}
);
