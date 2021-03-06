import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

:root {
    --color-dark-grey: #454955;
    --color-light-grey: #F6F3F7;
    --color-lime: #A5E250;
    --color-neon-lime: #b9f702;
    --font-main: 'Montserrat', sans-serif;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, select {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    vertical-align: baseline;
    font-family: 'Montserrat', sans-serif;
}
p, a{
    color: #F2F4F3;
    font-size: 20px;
}
h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    color: #F2F4F3;
}
h2{
    font-family: 'Montserrat', sans-serif;
    font-size: 25px;
    color: #F2F4F3;
}
html, body {
    background-color: #F6F3F7;
}
ul, li{
    color: #F2F4F3;
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
}
`;