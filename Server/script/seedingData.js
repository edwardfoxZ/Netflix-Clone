const movies = require("../movies.json");
const { prisma } = require("../db");

const seedingData = async () => {
  const formattedMovies = movies.map(
    ({ title, description, thumbnailUrl, videoUrl, duration, genre }) => {
      return {
        title,
        description,
        thumbnailUrl,
        videoUrl,
        duration,
        genre,
      };
    }
  );

  await prisma.movies.deleteMany();

  await prisma.movies.createMany({ data: formattedMovies });
};

seedingData();