import { BaseControl, BaseControlProps } from '../../types/control';

/**
 * Types for the props of the Border component.
 */
export type BorderControlType = BaseControl & {
	type: 'border';
	options?: string[];
	insidePanel?: boolean;
};

export type BorderControlProps = BaseControlProps & {
	control: BorderControlType;
};
