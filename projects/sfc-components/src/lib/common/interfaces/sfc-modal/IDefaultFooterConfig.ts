export default interface IDefaultFooterConfig {
    cancelButton?:boolean;
    okButton?:boolean;
    onCancel?: () => void;
    onOk?: () => void;
}