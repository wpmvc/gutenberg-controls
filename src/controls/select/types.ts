import { BaseControl, BaseControlProps, Options } from '../../types/control';

// Controls with required options
export type SelectControlType = BaseControl & {
	type: 'select';
	options: Options;
	isMulti?: boolean;
};

// Typed props for each specific control
export type SelectControlProps = BaseControlProps & {
	control: SelectControlType;
};
