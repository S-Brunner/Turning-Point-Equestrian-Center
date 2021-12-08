import React from "react";
import styled from "styled-components";

import NavBar from "./NavBar";

const TherapeuticRiding = () => {
    return (
            <>
                <ImgContainer>
                    <Image src="/images/ridingcontent.jpg" />
                </ImgContainer>
                <PageName>Therapeutic Riding Page</PageName>
                <NavBar />
                <Body>
                    <Testemonials>
                        <H2>Testemonials</H2>
                        <Content>
                            <ImgPlaceHolder>Img Place Holder</ImgPlaceHolder>
                            <TestemonialsPlaceHolder>Text Place Holder</TestemonialsPlaceHolder>
                        </Content>
                    </Testemonials>
                    <Instructors>
                        <H2>Meet Our Instructors</H2>
                        <Content className="instructors">
                            <InsImg src="/images/instructos.png"/>
                            <ul style={{marginLeft: "40px"}}>From left to right:
                                <li>Jennifer MacWilliam</li>
                                <li>Brigitte Drew</li>
                                <li>Michael Drew</li>
                            </ul>
                        </Content>
                    </Instructors>
                    <Benefits>
                        <H2>Benefits</H2>
                        <ul>
                            <li>Improves balance.</li>
                            <li>Improves coordination.</li>
                            <li>Mobilizes the trunk and pelvis.</li>
                            <li>Strengthens muscles.</li>
                            <li>Normalizes muscle tone.</li>
                            <li>Prevents contractures.</li>
                            <li>Promotes independence.</li>
                            <li>Increases self-esteem.</li>
                        </ul>
                    </Benefits>
                </Body>
            </>
        )
}

const ImgContainer = styled.div`
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    margin-top: -23%;
`;

const Image = styled.img`
    width: 100%;
    margin-top: -16%;
`;

const PageName = styled.h2`
    position: absolute;
    width: 100%;
    top: 65%;
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 40px;
`;

const Body = styled.div`
    background: rgba(20,49,9,1);;
    z-index: -1;
`;

const Benefits = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: -10px;
    padding-bottom: 50px;
    margin-top: 20px;
`;

const Instructors = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const InsImg = styled.img`
    width: 20%;
`;

const H2 = styled.h2`
    margin-top: 10px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 5px solid #A9927D;
    border-radius: 5px;
    text-align: center;
    width: 50%;
`;

const Testemonials = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    &.instructors{
        align-items: flex-start;
    }
`;


const ImgPlaceHolder = styled.div`
    width: 40%;
    height: 20vh;
    border: 2px solid #A9927D;
`;

const TestemonialsPlaceHolder = styled.div`
    width: 40%;
    height: 20vh;
    margin-left: 20px;
    border: 2px solid #A9927D;
`;
export default TherapeuticRiding;