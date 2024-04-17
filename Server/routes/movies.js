const router = require("express").Router();
const { prisma } = require("../db");

router.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);
  const count = await prisma.movies.count();
  const movies = await prisma.movies.findMany({
    take: 12,
    skip: offset,
  });
  return res.json({ movies, count });
});

router.get("/movie/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await prisma.movies.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie not found!" });
    }
    return res.send(movie);
  } catch (error) {
    console.error("error is : ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
