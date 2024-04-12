import { Schema, model } from "mongoose";

export interface Job {
  uuid: string;
  areaPolygon: number[][][];
  email: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastCompletedRun?: Date;
}

const JobSchema = new Schema<Job>(
  {
    uuid: { type: String, required: true, unique: true },
    areaPolygon: { type: Schema.Types.Mixed, required: true },
    email: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    lastCompletedRun: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

export const JobModel = model<Job>("Job", JobSchema);
