"use client"

import React, { useRef, useState } from 'react';
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@/context/ThemeProvider";
import { usePathname } from "next/navigation";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { AnswerSchema } from "@/lib/validation";
import { createAnswer } from "@/lib/actions/answer.action";

interface AnswerProps {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ question, authorId, questionId }: AnswerProps) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const editorRef = useRef(null);
  
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });

  const generateAIAnswer = async () => {
    if (!authorId) return;

    setIsSubmittingAI(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      if (data.reply) {
        const formattedAnswer = data.reply.replace(/\n/g, "<br />");
        if (editorRef.current) {
          const editor = editorRef.current as any;
          editor.setContent(formattedAnswer);
        }
      } else {
        throw new Error("AI reply is undefined");
      }
    } catch (error) {
      console.error("Error generating AI answer:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmittingAI(false);
    }
  };

  const handleCreateAnswer = async (values: z.infer<typeof AnswerSchema>) => {
    setIsSubmitting(true);

    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();

      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.error("Error creating answer:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10 flex flex-col gap-y-5">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark-400 dark:text-light-800">
          Write your answer here
        </h4>
        <Button
          className="btn light-border-2 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500 flex items-center gap-1"
          onClick={generateAIAnswer}
          disabled={isSubmittingAI}
        >
          {isSubmittingAI ? (
            <>Generating...</>
          ) : (
            <>
              <Star fill="#ff7000" className="size-4" />
              Generate an AI Answer
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCreateAnswer)}>
          <FormField
            name="answer"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY as string}
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
                        "anchor", "searchreplace", "visualblocks", "codesample", "fullscreen",
                        "insertdatetime", "media", "table"
                      ],
                      toolbar:
                        "undo redo | codesample | bold italic forecolor | alignleft aligncenter |" +
                        "alignright alignjustify | bullist numlist",
                      content_style: "body { font-family:Inter; font-size:16px }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default Answer;