import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Api from "../../api";
import { TextField } from "@mui/material";
import { MyBox, Title, SubContent, MyButton } from "./PwLinkStyle";
import { toast } from "react-toastify";

function PwLink() {
    const { rtoken } = useParams();
    const [pw, setPw] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const isPasswordSame = pw === confirmPw;
    const isPasswordValid = pw.length >= 4;
    const isFormValid = isPasswordValid && isPasswordSame;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await Api.post(`user/reset_password`, {
                resetToken: rtoken,
                password: pw,
            });
            toast.info("비밀번호 변경 성공");

            navigate("/");
        } catch (err) {
            toast.error("비밀번호 변경 실패");
            console.log("실패이유", err);
        }
    };

    return (
        <>
            <MyBox>
                <Title>비밀번호 변경하기</Title>
                <form onSubmit={handleSubmit}>
                    <SubContent>
                        <TextField
                            style={{ width: "80%", margin: "10px" }}
                            size="small"
                            label="PASSWORD"
                            type="password"
                            helperText={
                                isPasswordValid
                                    ? ""
                                    : "비밀번호는 4글자 이상입니다."
                            }
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </SubContent>
                    <SubContent>
                        <TextField
                            className="register-input"
                            style={{ width: "80%", margin: "10px" }}
                            size="small"
                            label="CONFIRM-PASSWORD"
                            type="password"
                            helperText={
                                isPasswordSame
                                    ? ""
                                    : "비밀번호가 일치하지 않습니다."
                            }
                            onChange={(e) => setConfirmPw(e.target.value)}
                        />
                    </SubContent>
                    <MyButton type="submit" disabled={!isFormValid}>
                        변경
                    </MyButton>
                </form>
            </MyBox>
        </>
    );
}

export default PwLink;
