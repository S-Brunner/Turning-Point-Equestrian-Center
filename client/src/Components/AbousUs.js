import React from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const AboutUs = () => {
    return (
        <>
            <ImgContainer>
                <Image src="/images/aboutusbg.png" />
            </ImgContainer>
            <PageName>About Us Page</PageName>
            <NavBar />
            <Body>
                <IframeContainer>
                    <Iframe src="https://www.youtube.com/embed/gKPJmKanFZE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></Iframe>
                </IframeContainer>
                <Statement>
                    <h2>Statement of Faith</h2>
                    <ul>What We Believe In:
                        <li>The Bible is the complete and inspired Word of God and is presented as truth.</li>
                        <li>There is but one true God in all existence who is the Creator of all things.</li>
                        <li>God to be infinitely perfect and eternally existing in three persons: Father, Son, and Holy Spirit.</li>
                        <li>God’s Eternal Plan is available to all persons regardless of gender or race.</li>
                    </ul>
                </Statement>
                <Book>
                    <h2>Our Story</h2>
                    <P style={{marginTop: "20px"}}>
                        With a vision of sharing God`s love with people, Fred and Jean Warnholtz signed the original property deed for Parkside Ranch in 1964. Parkside Ranch was incorporated in 1969 as a non-profit corporation. Early on campers slept in tents and there were two cabins that housed the kitchen and washrooms. Over the last 50+ years, Parkside`s facilities have expanded and changed however the mission of sharing God`s love with people has remained.
                    </P>
                    <BookImage src="/images/book.png" />
                    <BookPDF target="_blank" href="https://vite.parksideranch.com/files/images/admin/images/launch_out_into_the_deep.pdf">Read Full Story Here</BookPDF>
                </Book>
                <Main>
                    <img style={{ width: "50%" }} src="/images/aboutuscontent.png" />
                    <PContainer>
                        <P>
                            Parkside Ranch is a place of family and friends. It is our goal for you to grow in all areas of you life; physically, emotionally and spiritually. Physically, we offer development through sport activities (summer and winter), horseback riding and hiking. Emotionally, we offer a safe and loving environment with time to build relationships with a strong emphasis on family. Spiritually, we use the Bible as our guide and seek to show the practical love of God through our actions.
                        </P>
                        <P>
                            As a non-profit Christian organization we are also committed to helping our local community and to bless all who come to the Ranch.
                        </P>
                        <P>
                            Have a Great Day.
                        </P>
                        <P>
                            Greg & Pat MacWilliam
                        </P>
                    </PContainer>
                </Main>
            </Body>
        </>
    )
}

const Body = styled.div`
    background: rgba(20,49,9,1);;
    z-index: -1;
`;

const ImgContainer = styled.div`
    width: 100%;
    max-height: 89vh;
    overflow: hidden;
    margin-top: -23%;
`;

const Image = styled.img`
    width: 100%;
    margin-top: -12%;
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

const Statement = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #F2F4F3;
    margin-top: 50px;
    margin-bottom: 30px;
    margin-left: 10%;
    padding-bottom: 30px;
    width: 80%;
    border-radius: 5px;
    border-bottom: 5px solid #A9927D;
`;

const Book = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BookImage = styled.img`
    width: 20%;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const BookPDF = styled.a`
    text-align: center;
    text-decoration: none;
    width: 90%;
    border-radius: 5px;
    border-bottom: 5px solid #A9927D;
    padding-bottom: 10px;
`;

const Main = styled.div`
    display: flex;
    margin-bottom: -10px;
    margin-top: 20px;
    padding-bottom: 50px;
    margin-left: 10%;
`;

const PContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const P = styled.p`
    width: 50%;
    margin-left: 20px;
    margin-bottom: 20px;
`;

const Iframe = styled.iframe`
    width: 50%;
    height: 50vh;
`;

const IframeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 2%;
    margin-bottom: 2%;
`;
export default AboutUs;