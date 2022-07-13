const { Quotes } = require("../models");
const axios = require("axios");

module.exports = {
  getQuote: async (req, res) => {
    try {
      const result = await axios.get(`https://api.kanye.rest/`);

      const exist = await Quotes.findOne({
        where: { quote: result.data.quote },
      });

      if (exist) {
        return res.status(200).json({
          ...result.data,
          message: "Already exist in database, can't write anymore",
        });
      } else {
        await Quotes.create({
          quote: result.data.quote,
          favorite: false,
        });
      }

      res.status(200).json({
        ...result.data,
        message: "Quote has been inserted to your database",
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
        status: "Internal Server Error",
      });
    }
  },

  getAllQuotes: async (req, res) => {
    try {
      const quotes = await Quotes.findAll({
        where: {
          favorite: false,
        },
      });

      const favorite = await Quotes.findAll({
        where: {
          favorite: true,
        },
      });

      res.status(200).json({
        quotes,
        favorite,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "Internal Server Error",
      });
    }
  },

  postQuotes: async (req, res) => {
    const { quote } = req.body;
    try {
      const exist = await Quotes.findOne({
        where: { quote },
      });

      if (exist) {
        return res.status(200).json({
          quote,
          message: "Already exist in database, can't write anymore",
        });
      }

      const result = await Quotes.create({
        quote,
        favorite: false,
      });

      res.status(200).json({
        data: result,
        message: "Quote has been inserted to your database",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "Internal Server Error",
      });
    }
  },

  putQuotes: async (req, res) => {
    const { id } = req.query;
    try {
      const exist = await Quotes.findOne({
        where: { id },
        attributes: ["quote", "favorite"],
      });

      if (!exist) {
        return res.status(404).json({ message: "Quote not found" });
      }

      const update = await Quotes.update(
        {
          favorite: !exist.favorite,
        },
        { where: { id } }
      );

      exist.favorite = !exist.favorite;

      res.status(200).json({
        data: exist,
        message: exist.favorite
          ? "Quotes is now favorite"
          : "Quotes is not favorite",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "Internal Server Error",
      });
    }
  },

  deleteQuotes: async (req, res) => {
    const { id } = req.query;
    try {
      const exist = await Quotes.findOne({
        where: { id },
      });

      if (!exist) {
        return res.status(404).json({ message: "Quote not found" });
      }

      await Quotes.destroy({
        where: { id },
      });

      return res.status(200).json({
        message: "Quotes has been deleted!",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        status: "Internal Server Error",
      });
    }
  },
};
