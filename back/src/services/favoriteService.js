import { FavoriteModel } from "../db/schemas/favorite";
import { UserModel } from "../db/schemas/user";
import { BoardGameModel } from "../db/schemas/boardgame";
import mongoose from "mongoose";

class favoriteAuthService {
<<<<<<< HEAD
  static async addFavorite({ userId, boardgameId }) {
    const user = await UserModel.findOne({ _id: userId });
    const game = await BoardGameModel.findOne({ game_id: boardgameId });

    if (!user) {
      const errorMessage = "해당 메일은 가입 내역이 없습니다.";
      return { errorMessage };
=======
    static async addFavorite({ userId, boardgameId }) {
        const user = await UserModel.findOne({ _id: userId });
        const game = await BoardGameModel.findOne({ game_id: boardgameId });

        if (!user) {
            const errorMessage = "해당 메일은 가입 내역이 없습니다.";
            return { errorMessage };
        }

        if (!game) {
            const errorMessage = "해당 보드게임은 존재하지 않습니다.";
            return { errorMessage };
        }

        const favorite = await FavoriteModel.updateOne(
            { user: user._id },
            { $push: { boardgame: game } }
        );

        return favorite;
>>>>>>> 00f392baed172b64a3e54dd20a45c3e75739fa71
    }

    if (!game) {
      const errorMessage = "해당 보드게임은 존재하지 않습니다.";
      return { errorMessage };
    }

<<<<<<< HEAD
    const favorite = await FavoriteModel.updateOne(
      { user: user._id },
      { $push: { boardgame: game._id } }
    );
=======
    // 로그인한 유저가 찜한 보드게임인지 아닌지 판별
    static async findDetailFavorite({ userId, boardgameId }) {
        const game = await BoardGameModel.findOne({ game_id: boardgameId });

        const favorite = await FavoriteModel.findOne({
            userId,
            boardgame: { $in: [game] },
        });
>>>>>>> 00f392baed172b64a3e54dd20a45c3e75739fa71

    return favorite;
  }

  static async findFavorite({ userId }) {
    const favorites = await FavoriteModel.find({ user: userId }).populate(
      "boardgame"
    );

    return favorites;
  }

  // 로그인한 유저가 찜한 보드게임인지 아닌지 판별
  static async findDetailFavorite({ userId, boardgameId }) {
    const favorite = await FavoriteModel.findOne({
      userId,
      boardgame: { $in: [boardgameId] },
    });

    if (!favorite) {
      return false;
    }

    return true;
  }
}

export { favoriteAuthService };
