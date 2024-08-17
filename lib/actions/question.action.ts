"use server";

import Question from "@/models/question.model";
import { connectToDatabase } from "../mongoose";
import { createQuestionParams } from "./shared.types";
import Tag from "@/models/tag.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: any) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: "author", model: "User" })
      .populate({ path: "tags", model: "Tag" })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: createQuestionParams) {
  try {
    connectToDatabase();

    const { title, author, content, tags, path } = params;

    const question = await Question.create({
      title,
      author,
      content,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag },
          $push: {
            question: question._id,
          },
        },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: {
        tags: {
          $each: tagDocuments,
        },
      },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}
