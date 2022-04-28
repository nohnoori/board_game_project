import { Router } from "express";
// 이후에 추가할 것
import { boardgameController } from "../controllers/boardGameController";

const boardGameRouter = Router();
// board game 라우팅도 authJWT는 추가할 것 - 현재는 테스트를 위해 추가하지 않음

// 19년도 전체 게임 조회
boardGameRouter.get("/boardGames", boardgameController.findAllGames);

// 20년도 최신 게임 조회
boardGameRouter.get("/recentlyGames", boardgameController.findRecentlyGames);

// 인원수에 따른 조회
// 프론트 테스트용
boardGameRouter.get("/games/:player", boardgameController.findByPlayer);

boardGameRouter.get("/condition", boardgameController.findByCondition);

export { boardGameRouter };
