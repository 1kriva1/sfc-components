import IDataModel from "./IDataModel";

export default interface IDataConfig {
    index: number;
    sequenceNumber?: number;
    model: IDataModel;
}