export class AddCommentDto {
  userId: number;
  comment: string;
  targetCommentId?: number;
  targetUserId?: number;
}
