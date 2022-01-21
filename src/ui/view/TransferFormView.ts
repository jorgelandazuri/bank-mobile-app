export interface TransferFormView  {

  onFormSubmitted(): void

  showTransferSuccess(): void;

  showTransferError(error: string): void;
}