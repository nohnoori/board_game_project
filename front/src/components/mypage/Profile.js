import React, { useState } from "react";
import * as Api from "../../api";
import { StylesProvider } from "@material-ui/core";
import AWS from "aws-sdk";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";

// CALL IT ONCE IN YOUR APP
if (typeof window !== "undefined") {
    injectStyle();
}

import {
    MyBox,
    Title,
    StyledInput,
    Content,
    SubTitle,
    SubContent,
    HelperText,
    MyButton,
    GoogleTitle,
} from "./ProfileStyle";

function Profile({ ownerData, setOwnerData }) {
    const region = "ap-northeast-2";
    const bucket = "elice-boardgame-project";

    AWS.config.update({
        region: region,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });

    const handleFileInput = async (e) => {
        console.log(ownerData._id);
        const file = e.target.files[0];

        await Api.put(`user/${ownerData._id}`, {
            image: ownerData._id,
        });

        console.log("이미지 성공");
        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: bucket, // 버킷 이름
                Key: ownerData._id + ".png", // 유저 아이디
                Body: file, // 파일 객체
            },
        });

        const promise = upload.promise();
        promise.then(
            function () {
                toast.info("이미지 업로드에 성공했습니다.");
                window.setTimeout(function () {
                    location.reload();
                }, 2000);
            },
            function (err) {
                return toast.error("이미지 업로드에 실패하였습니다.");
            }
        );
    };

    //회원정보 변경 코드
    const [user_name, setUser_name] = useState(ownerData.user_name);
    const email = ownerData.email;
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [phone_number, setPhone_number] = useState(ownerData?.phone_number);
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === confirmPassword;
    const isNameValid = user_name.length >= 2;
    const isFormValid = isPasswordValid && isPasswordSame && isNameValid;
    const home = ownerData.OAuthProvider;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await Api.put(`user/${ownerData._id}`, {
            user_name,
            email,
            password,
            phone_number,
        });
        const updateUser = res.data;
        setOwnerData(updateUser);
        console.log(updateUser);
        setPassword("");
        setConfirmPassword("");

        toast.info("정보를 수정하였습니다.");
    };

    return (
        <>
            {home === "home" ? (
                <MyBox>
                    <Title>
                        <PersonIcon /> 회원정보 변경
                    </Title>
                    <form onSubmit={handleSubmit} style={{ height: "80%" }}>
                        <Content>
                            <SubContent>
                                <SubTitle>프로필 사진 변경하기</SubTitle>
                                <StyledInput
                                    style={{ width: "50%" }}
                                    type="file"
                                    id="upload"
                                    className="image-upload"
                                    onChange={handleFileInput}
                                />
                            </SubContent>
                            <SubContent>
                                <SubTitle>이름</SubTitle>
                                <StyledInput
                                    type="text"
                                    required
                                    value={user_name}
                                    onChange={(e) => {
                                        setUser_name(e.target.value);
                                    }}
                                />
                                {isNameValid ? null : (
                                    <HelperText>
                                        2글자 이상입력해주세요.
                                    </HelperText>
                                )}
                            </SubContent>

                            <SubContent>
                                <SubTitle>이메일</SubTitle>
                                <StyledInput
                                    type="text"
                                    required
                                    disabled={true}
                                    value={ownerData.email}
                                />
                                <HelperText> 변경하실 수 없습니다.</HelperText>
                            </SubContent>
                            <SubContent>
                                <SubTitle>비밀번호</SubTitle>
                                <StyledInput
                                    type="password"
                                    value={password}
                                    required
                                    placeholder="비밀번호 변경"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                {isPasswordValid ? null : (
                                    <HelperText>
                                        4자리 이상 입력해주세요.
                                    </HelperText>
                                )}
                            </SubContent>

                            <SubContent>
                                <SubTitle>비밀번호 확인</SubTitle>
                                <StyledInput
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    placeholder="비밀번호 확인"
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                {isPasswordSame ? null : (
                                    <HelperText>
                                        비밀번호가 일치하지 않습니다.
                                    </HelperText>
                                )}
                            </SubContent>

                            <SubContent>
                                <SubTitle>전화번호</SubTitle>
                                <StyledInput
                                    type="text"
                                    placeholder="전화번호 변경"
                                    value={phone_number}
                                    onChange={(e) =>
                                        setPhone_number(e.target.value)
                                    }
                                />
                            </SubContent>
                            <SubContent
                                style={{ textAlign: "center", height: "10%" }}
                            >
                                <StylesProvider injectFirst>
                                    <MyButton
                                        type="submit"
                                        disabled={!isFormValid}
                                    >
                                        변경하기
                                    </MyButton>
                                </StylesProvider>
                            </SubContent>
                        </Content>
                    </form>
                </MyBox>
            ) : (
                <GoogleTitle>
                    구글 로그인은 회원정보 변경을 할 수 없습니다.
                </GoogleTitle>
            )}
        </>
    );
}

export default Profile;
