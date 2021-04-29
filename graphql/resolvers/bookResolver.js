const Book = require("../../models/Book");
const Content = require("../../models/Content");
const { InternalError, CreatedResponse } = require("../constants");
const { createDto } = require("../utils/response-utils");

module.exports = {
  Query: {
    books: async () => {
      return await Book.find();
    },
  },
  Mutation: {
    addBook: async (_, args) => {
      try {
        for (const chapter of args.chapters) {
          for (const page of chapter.pages) {
            const content = new Content({
              text: page.content,
            });
            await content.save();

            page.content = content._id;
          }
        }

        const book = new Book({ ...args });
        await book.save();

        return CreatedResponse({
          book: createDto(book),
        });
      } catch (err) {
        return InternalError;
      }
    },
  },
};
