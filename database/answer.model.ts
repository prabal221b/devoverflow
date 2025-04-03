import { model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  author: Types.ObjectId;
  question: Types.ObjectId;
  content: string;
  upvotes: number;
  downvotes: number;
}

const AnswerSchema = new Schema<IAnswer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    question: { type: Schema.ObjectId, ref: "Question", required: true },
    content: { type: String, required: true },
    upvotes: { type: Number, Default: 0 },
    downvotes: { type: Number, Default: 0 },
  },
  { timestamps: true }
);

const Answer = models?.Question || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
