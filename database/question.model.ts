import { model, models, Schema, Types } from "mongoose";

export interface IQuestion {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags: Types.ObjectId[];
  creationDate: Date;
  views: number;
  answers: number;
  upvotes: number;
  downvotes: number;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    creationDate: { type: Schema.Types.Date, required: true },
    views: { type: Number, default: 0 },
    answers: { type: Number, default: 0 },
    upvotes: { type: Number, Default: 0 },
    downvotes: { type: Number, Default: 0 },
  },
  { timestamps: true }
);

const Question =
  models?.Question || model<IQuestion>("Account", QuestionSchema);

export default Question;
