import { Router } from "express";

// refresh는 남겨두기
import { refresh } from "../utils/refresh";
import { authJWT } from "../middlewares/authJWT";

import { userController } from "../controllers/userController";

const userAuthRouter = Router();

userAuthRouter.post("/user/register", userController.userRegister);

// 모든 회원 정보 가져오기
userAuthRouter.get("/users", userController.findAllUser);

// 로그인
userAuthRouter.post("/user/login", userController.userLogin);

// 회원 정보 가져오기
userAuthRouter.get("/users/:id", authJWT, userController.findUserById);

// 회원 정보 수정하기
userAuthRouter.put("/user/:id", authJWT, userController.setUserInfo);

// 현재 유저 정보 가져오기
userAuthRouter.get("/currentUser", authJWT, userController.getCurrentUser);

// 구글 로그인
userAuthRouter.post("/oauth/google", userController.googleLogin);

// 비밀번호 찾기 위한 토큰 값 생성
userAuthRouter.post("/reset_token", userController.generateResetToken);

// 유효 토큰 확인 후 비밀번호 변경
userAuthRouter.post("/user/reset_password", userController.resetPassword);

// refresh는 리팩토링 필요..
userAuthRouter.get("/token/refresh", refresh);

export { userAuthRouter };
