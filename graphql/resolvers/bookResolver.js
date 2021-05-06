const Book = require("../../models/Book");
const Content = require("../../models/Content");
const {
  InternalError,
  CreatedResponse,
  QueryResponse,
  NotFound,
  NoContent,
} = require("../constants");
const { createDto } = require("../utils/response-utils");

module.exports = {
  Query: {
    books: async (_, args) => {
      try {
        const books = await Book.find({ deletedAt: null })
          .skip((args.page - 1) * args.perPage)
          .limit(args.perPage)
          .populate("chapters.pages.content")
          .populate("currency")
          .populate("genres");

        const to = args.page * args.perPage;

        return QueryResponse({
          total: books.length,
          perPage: args.perPage,
          currentPage: args.page,
          lastPage: Math.ceil(books.length / args.perPage),
          from: (args.page - 1) * args.perPage + 1,
          to: books.length < to ? books.length : to,
          books: books.map((v) => createDto(v)),
        });
      } catch (err) {
        console.log(err.message);
        return InternalError;
      }
    },
    book: async (_, args) => {
      try {
        const book = await Book.findById(args.id)
          .populate("chapters.pages.content")
          .populate("currency")
          .populate("genres");

        if (!book) {
          return NotFound;
        }

        return QueryResponse({ book: createDto(book) });
      } catch (err) {
        return InternalError;
      }
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      try {
        for (const chapter of args.bookInput.chapters) {
          for (const page of chapter.pages) {
            const content = new Content({
              text: page.content,
            });
            await content.save();

            page.content = content._id;
          }
        }

        const book = new Book({ ...args.bookInput });
        await book.save();

        return CreatedResponse({
          book: createDto(book),
        });
      } catch (err) {
        console.log(err.message);
        return InternalError;
      }
    },
    updateBook: async (_, args) => {
      try {
        const book = await Book.findById(args.bookInput.id);

        if (!book) {
          return NotFound;
        }

        for (const chapter of book.chapters) {
          await Content.deleteMany({
            _id: {
              $in: chapter.pages.map((page) => page.content),
            },
          });
        }

        for (const chapter of args.bookInput.chapters) {
          for (const page of chapter.pages) {
            const content = new Content({
              text: page.content,
            });
            await content.save();

            page.content = content._id;
          }
        }

        for (const [key, value] of Object.entries(args.bookInput)) {
          book[key] = value;
        }

        await book.save();

        return CreatedResponse({
          code: "200",
          book: createDto(book),
        });
      } catch (err) {
        return InternalError;
      }
    },
    deleteBook: async (_, args) => {
      try {
        const book = await Book.findById(args.id);

        if (!book) {
          return NotFound;
        }

        book.deletedAt = new Date().toISOString();
        await book.save();

        return NoContent;
      } catch (err) {
        return InternalError;
      }
    },
  },
};
