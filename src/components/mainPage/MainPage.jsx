import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PattyIndex } from "../../state/atoms";

const Main = () => {
    const pattyIndex = useRecoilValue(PattyIndex);
    const setPattyIndex = useSetRecoilState(PattyIndex);
    const [ScrollY, setScrollY] = useState(0); // 스크롤값을 저장하기 위한 상태
    const [GobuttonState, setGobuttonState] = useState(false);
    const patties = ["beef", "chicken", "shrimp"];
    const pattiesBackground = ["#5F3223", "#E16F1F", "#D72306"];
    const navigate = useNavigate();

    console.log(window.innerWidth, window.innerHeight);

    const ClickGobutton = (path) => {
        setGobuttonState(true);
        setTimeout(() => {
            navigate(path);
        }, 1800);
    };
    const clickPrevBtn = () => {
        if (pattyIndex === 0) {
            setPattyIndex(patties.length - 1);
        } else {
            setPattyIndex(pattyIndex - 1);
        }
    };
    const clickNextBtn = () => {
        if (pattyIndex === patties.length - 1) {
            setPattyIndex(0);
        } else {
            setPattyIndex(pattyIndex + 1);
        }
    };
    const handleFollow = () => {
        setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
        if (ScrollY < 108) {
            setGobuttonState(false);
        }
    };
    useEffect(() => {
        const watch = () => {
            window.addEventListener("scroll", handleFollow);
        };
        watch(); // addEventListener 함수를 실행
        window.innerWidth < window.innerHeight &&
            alert("모바일 환경에서는 가로모드로 이용해주세요");
        return () => {
            window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
        };
    });
    return (
        <WrabMain>
            <Wrab scroll={ScrollY} color={pattiesBackground[pattyIndex]}>
                {ScrollY < 108 ? (
                    <WrabScroll>
                        <Mouse src="./img/mousescroll.png"></Mouse>
                        <Down src="./img/down.png"></Down>
                    </WrabScroll>
                ) : (
                    !GobuttonState && (
                        <>
                            <WrabBtn>
                                <PrevButton
                                    type="button"
                                    onClick={clickPrevBtn}
                                    imgName={patties[pattyIndex]}
                                ></PrevButton>
                                <NextButton
                                    type="button"
                                    onClick={clickNextBtn}
                                    imgName={patties[pattyIndex]}
                                ></NextButton>
                            </WrabBtn>

                            <GoButton onClick={() => ClickGobutton("/menu")}>
                                <GoText color={pattiesBackground[pattyIndex]}>
                                    Let's find
                                </GoText>
                                <GoText color={pattiesBackground[pattyIndex]}>
                                    {patties[pattyIndex]} burgers
                                </GoText>
                            </GoButton>

                            <Cursor />
                        </>
                    )
                )}

                <WrabMainTexts>
                    <div>
                        <MainText scroll={ScrollY}>Choice</MainText>
                        <MainText scroll={ScrollY}>Your</MainText>
                        <MainText scroll={ScrollY}>Burger</MainText>
                    </div>
                </WrabMainTexts>
                <WrabPattyTexts>
                    <PattyText scroll={ScrollY}>
                        {patties[pattyIndex]}
                    </PattyText>
                </WrabPattyTexts>

                <WrabBurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/topburn.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/lettuce.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/onion.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/pickle.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/tomato.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/cheese.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background: `center / cover no-repeat url(../img/${patties[pattyIndex]}_patty.png)`,
                            transition:
                                ScrollY < 108
                                    ? "1s"
                                    : GobuttonState
                                    ? "1s"
                                    : "0s",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                    <BurgerImg
                        style={{
                            background:
                                "center / cover no-repeat url(../img/bottomburn.png)",
                        }}
                        scroll={ScrollY}
                        go={GobuttonState}
                    ></BurgerImg>
                </WrabBurgerImg>
            </Wrab>
        </WrabMain>
    );
};

export default Main;

const WrabMain = styled.div`
    height: 150vh;
`;
const Wrab = styled.div`
    position: fixed;
    width: 100%;
    height: 100vh;
    text-align: center;
    background-color: ${(props) =>
        props.scroll > 100 ? props.color : "#F4EBDC"};
    transition: 1s;
`;
const WrabScroll = styled.div`
    position: absolute;
    display: flex;
    z-index: 10;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 10%;
    right: 15%;
    @media (max-width: 1281px) {
        right: 5%;
    }
`;
const Mouse = styled.img`
    position: absolute;
    width: 50%;
`;
const DownBlink = keyframes`
    0%{opacity:0}
    33%{opacity:1}
    66%{opacity:0}
    100%{opacity:1}

`;
const Down = styled.img`
    position: absolute;
    width: 30%;
    top: 70%;
    animation: ${DownBlink} 2s 0s infinite linear alternate;
`;
const WrabBtn = styled.div`
    position: absolute;
    display: flex;
    z-index: 20;
    height: 10%;
    top: 62%;
    justify-content: center;
    align-items: center;
    width: 100%;
`;
const PrevButton = styled.button`
    margin-right: 40%;
    background: no-repeat url("./img/left.png");
    background-size: cover;
    width: 5%;
    height: 100%;
    border: none;
    object-fit: cover;
`;
const NextButton = styled.button`
    width: 5%;
    height: 100%;
    background: no-repeat url("./img/right.png");
    background-size: cover;
    border: none;
    object-fit: cover;
`;
const WrabPattyTexts = styled.div`
    top: 30%;
    position: absolute;
    width: 100%;
`;
const WrabMainTexts = styled.div`
    position: absolute;
    display: flex;
    text-align: left;
    z-index: 10;
    height: 100%;
    align-items: center;
    width: 80%;
`;
const MainText = styled.div`
    margin-left: 10%;
    font-size: 7vw;
    font-weight: 900;
    color: #512314;
    opacity: ${(props) => (props.scroll > 100 ? 0 : 1)};
    transition: 0.3s;
`;
const PattyText = styled.div`
    position: absolute;
    width: 100%;
    color: rgba(0, 0, 0, 0.3);
    font-size: 20vw;
    font-weight: 900;
    opacity: ${(props) => (props.scroll > 100 ? 1 : 0)};
    transition: 0.3s;
    text-transform: uppercase;
`;

const GoButton = styled.div`
    position: absolute;
    right: 6.5%;
    bottom: 7%;
    width: 13vw;
    height: 13vw;
    background-color: orange;
    background-size: cover;
    border-radius: 50%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    z-index: 300;
    cursor: pointer;
    transition: 1s;
    &:hover {
        transform: rotate(20deg);
    }
`;

const GoText = styled.span`
    color: black;
    font-size: 2.7vw;
    text-shadow: -0.3vw -0.2vw 0px ${(props) => props.color};
    &:first-child {
        transform: translate(-7%, 2%) skew(10deg, -25deg);
    }
    &:last-child {
        transform: translate(10%, -5%) skew(10deg, -25deg);
    }
`;

const Cursor = styled.div`
    position: absolute;
    right: 3.5%;
    bottom: 7%;
    background-image: url("./img/cursor.png");
    background-size: cover;
    width: 3.7%;
    height: 9%;
    z-index: 400;
    transform: rotate(-25deg);
`;

const WrabBurgerImg = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    height: 100%;
`;
const BurgerImg = styled.div`
    position: absolute;
    display: inline-block;
    height: 10vw;
    width: 28vw;
    filter: ${(props) =>
        props.scroll > 100
            ? props.go === true
                ? "blur(0px)"
                : "blur(2px)"
            : "blur(0px)"};
    transition: 1s;
    #patty {
        transition: 0s;
        background-color: black;
    }
    &:nth-child(1) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "25%" : "5%") : "25%"};
        z-index: 100;
    }
    &:nth-child(2) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "35%" : "18%") : "35%"};
        z-index: 90;
    }
    &:nth-child(3) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "40%" : "25%") : "40%"};
        z-index: 80;
    }
    &:nth-child(4) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "42%" : "30%") : "42%"};
        z-index: 70;
    }
    &:nth-child(5) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "45%" : "35%") : "45%"};
        z-index: 60;
    }
    &:nth-child(6) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "51%" : "45%") : "51%"};
        z-index: 50;
    }
    &:nth-child(7) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "54%" : "58%") : "54%"};
        transform: ${(props) =>
            props.scroll > 100
                ? props.go === true
                    ? "scale(1);"
                    : "scale(1.3)"
                : "scale(1);"};
        filter: blur(0px);
        z-index: 40;
    }
    &:nth-child(8) {
        top: ${(props) =>
            props.scroll > 100 ? (props.go === true ? "62%" : "75%") : "62%"};
        z-index: 30;
    }
    @media (max-width: 1281px) {
        margin-left: ${(props) => (props.scroll < 100 ? "25%" : "0%")};
    }
`;
