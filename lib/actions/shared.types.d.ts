import { IUser } from "@/models/user.model"
import { Schema } from "mongoose"

export interface createQuestionParams {
    title: string
    content: string
    tags: string[]
    author: Schema.Types.ObjectId | IUser
    path: string
}

export interface GetQuestionsParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
  }