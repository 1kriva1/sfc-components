import { TableColumnType } from "../../constants/common-constants";
import ISortingConfig from "../sfc-sorting/ISortingConfig";


export interface IColumnModel {
    columnName: string;
    fieldName: string;
    icon?: string;
    sorting?: ISortingConfig;
}

export interface IColumnConfig extends IColumnModel {
    type?: TableColumnType;
}