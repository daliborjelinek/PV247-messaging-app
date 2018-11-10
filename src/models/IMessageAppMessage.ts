export interface  IMessageAppMessage {
  readonly id: Uuid;
  readonly text: string;
  readonly date: string;
  readonly authorId: Uuid;
  readonly rating: number;
  readonly channelId: Uuid;
}
