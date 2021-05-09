const Genre = require("../../models/Genre");
const {
  InternalError,
  NotFound,
  QueryResponse,
  CreatedResponse,
  NoContent,
  UpdatedResponse,
} = require("../constants");
const { createDto } = require("../../utils/response-utils");

module.exports = {
  Query: {
    genres: async () => {
      try {
        const genres = await Genre.find({ deletedAt: null });

        return QueryResponse({
          genres: genres.map((genre) => createDto(genre)),
        });
      } catch (err) {
        return InternalError;
      }
    },
    genre: async (_, args) => {
      try {
        const genre = await Genre.findById(args.id);

        if (!genre) {
          return NotFound;
        }

        return QueryResponse({
          genre: createDto(genre),
        });
      } catch (err) {
        return InternalError;
      }
    },
  },
  Mutation: {
    addGenre: async (_, args) => {
      try {
        const genre = new Genre(args);
        await genre.save();

        return CreatedResponse({
          genre: createDto(genre),
        });
      } catch (err) {
        return InternalError;
      }
    },
    updateGenre: async (_, args) => {
      try {
        const genre = await Genre.findById(args.id);

        if (!genre) {
          return NotFound;
        }

        return UpdatedResponse({
          genre: createDto(genre),
        });
      } catch (err) {
        return InternalError;
      }
    },
    deleteGenre: async (_, args) => {
      try {
        const genre = await Genre.findById(args.id);

        if (!genre) {
          return NotFound;
        }

        genre.deletedAt = new Date().toISOString();
        await genre.save();

        return NoContent;
      } catch (err) {
        return InternalError;
      }
    },
  },
};
