"use server"

import { connectToDatabase } from "@/lib/mongoose";
import { CreateAnswerParams, GetAnswersParams } from "./shared.types";
import Answer from "@/models/answer.model";
import Question from "@/models/question.model";
import { revalidatePath } from "next/cache";
import User from "@/models/user.model";

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectToDatabase();

    const { author, content, path, question } = params;

    const answer = await Answer.create({
      author,
      content,
      question,
    });

    await Question.findByIdAndUpdate(question, {
      $push: { answers: answer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectToDatabase();

    const { questionId, page, pageSize, sortBy } = params;

    const answers = await Answer.find({ question: questionId })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId picture name",
      })
      .sort({ createdAt: -1 });

    return { answers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
