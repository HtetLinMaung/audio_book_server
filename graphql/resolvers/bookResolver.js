const Book = require("../../models/Book");
const Content = require("../../models/Content");
const {
  InternalError,
  CreatedResponse,
  QueryResponse,
} = require("../constants");
const { createDto } = require("../utils/response-utils");

module.exports = {
  Query: {
    books: async () => {
      try {
        const books = await Book.find({ deletedAt: null })
          .populate("chapters.pages.content")
          .populate("currency")
          .populate("genres");

        return QueryResponse({
          books: books.map((v) => createDto(v)),
        });
      } catch (err) {
        console.log(err.message);
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
  },
};
