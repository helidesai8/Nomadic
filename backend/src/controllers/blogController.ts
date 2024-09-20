// author: Heli Desai

import { Request, Response } from "express";
import { prismaClient as prisma } from "../server";
import { Prisma } from "@prisma/client";

export async function getAllBlogPosts(req: Request, res: Response) {
  try {
    const { category, page, limit: limitQ = 6 } = req.query;
    const limit = typeof limitQ === "string" ? parseInt(limitQ) : 6;
    console.log({limit});
    const filter: Prisma.BlogPostWhereInput = {};
    if (category) {
      filter.category = {
        contains: category.toString(),
        mode: "insensitive",
      };
    }
    const blogs = await prisma.blogPost.findMany({
      where: filter,
      orderBy: {
        createdAt: "desc",
      },
      skip: page
        ? (parseInt(page.toString()) - 1) * parseInt(limit.toString())
        : 0,
      take: parseInt(limit.toString()),
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        category: true,
        createdAt: true,
        userId: true,
      },
    });

    const totalBlogsCount = await prisma.blogPost.count({
      where: filter,
    });
    res.status(200).json({
      data: blogs,
      meta: {
        page: page ? parseInt(page.toString()) : 1,
        totalPages: Math.ceil(totalBlogsCount / parseInt(limit.toString())),
        limit: parseInt(limit.toString()),
        total: totalBlogsCount,
      },
    });
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to fetch blog posts: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch blog posts due to an unknown error" });
    }
  }
}

export async function createBlogPost(req: Request, res: Response) {
  const { title, content, category, description, thumbnail,userId } = req.body;
  try {
    const blog = await prisma.blogPost.create({
      data: { title, content, category, description, thumbnail, userId},
    });
    res.status(201).json(blog);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to create blog post: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to create blog post due to an unknown error" });
    }
  }
}

export async function updateBlogPost(req: Request, res: Response) {
  const { id } = req.params;
  const { title, content, category, description, thumbnail, userId } = req.body;
  try {
    const blog = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data: { title, content, category, description, thumbnail, userId },
    });
    res.json(blog);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to update blog post: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to update blog post due to an unknown error" });
    }
  }
}

export async function deleteBlogPost(req: Request, res: Response) {
  const { id } = req.params;
  try {
    await prisma.blogPost.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({
      message: "Blog post deleted successfully",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to delete blog post: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to delete blog post due to an unknown error" });
    }
  }
}

export async function getBlogPostById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const blogPost = await prisma.blogPost.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: {
          select: {
            ratings: true,
            comment: true,
            createdAt: true,
            name: true, // Assuming you have a 'name' field in comments
          },
          orderBy: {
            createdAt: "desc",
          }
        },
      },
    });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.status(200).json(blogPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to fetch blog post: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch blog post due to an unknown error" });
    }
  }
}

export const getBlogCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.blogPost.findMany({
      select: {
        category: true,
      },
    });
    const uniqueCategories = Array.from(
      new Set(categories.map((c) => c.category))
    );
    res.status(200).json({
      categories: uniqueCategories,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to fetch blog categories: " + error.message });
    } else {
      res.status(500).json({
        error: "Failed to fetch blog categories due to an unknown error",
      });
    }
  }
};

export async function getBlogPostByUserId(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const blogPost = await prisma.blogPost.findMany({
      where: { userId: parseInt(userId) },
    });
    res.status(200).json(blogPost);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: "Failed to fetch blog post: " + error.message });
    } else {
      res
        .status(500)
        .json({ error: "Failed to fetch blog post due to an unknown error" });
    }
  }
}