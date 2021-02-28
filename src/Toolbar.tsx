import React, {FC, memo, useEffect, useRef, useState} from "react";
import {
    HeaderBack, HeaderContent, HeaderLogo, HeaderTitle, HeaderSubtitle
} from '@sberdevices/ui';
import { Container, Row, Col }  from '@sberdevices/ui';
import {IconAvatar, IconCartAlt, IconInfo} from "@sberdevices/plasma-icons";
import {HeaderRoot} from "@sberdevices/ui/components/Header/HeaderRoot";
import {HeaderTitleWrapper} from "@sberdevices/ui/components/Header/HeaderTitleWrapper";
import {background, body1, gradient} from "@sberdevices/plasma-tokens";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import {darkSber} from "@sberdevices/plasma-tokens/themes/darkSber";
import {Alarm} from './Alarm'
import {Menu} from './Menu'

const DocStyles = createGlobalStyle`
  html {
    background-color: ${background};
    background-image: ${gradient};
    min-height: 100vh;
  }
`;
const Theme = createGlobalStyle(darkSber);
const AppStyled = styled.div`
  ${body1}
`;

class SuperTheme {
    private color: string;
    constructor() {
        this.color = "white";
    }
}

const theme = new SuperTheme();

export const Toolbar: FC = memo(() => {
    function handleClick() {
        console.log('Back Button');
    }
    return (
<<<<<<< HEAD:src/Template.tsx
        <ThemeProvider theme={theme}>
            <AppStyled>
                <DocStyles />
                <Theme />
                <Container>
                    {/*<HeaderRoot style={{ minWidth: 1056, backgroundColor: "transparent" }}>*/}
                    {/*    <HeaderBack onClick={handleClick}/>*/}
                    {/*    /!*<HeaderLogo src="./images/logo.png" />*!/*/}
                    {/*    <HeaderTitleWrapper>*/}
                    {/*        <HeaderTitle>{'Завтра завтрак'}</HeaderTitle>*/}
                    {/*        <HeaderSubtitle>{'Subtitle text'}</HeaderSubtitle>*/}
                    {/*    </HeaderTitleWrapper>*/}
                    {/*    <HeaderContent>*/}
                    {/*        /!*<Content />*!/*/}
                    {/*    </HeaderContent>*/}
                    {/*    <IconCartAlt/>*/}
                    {/*</HeaderRoot>*/}
                    {/*<Alarm></Alarm>*/}
                </Container>
            </AppStyled>
        </ThemeProvider>

=======
        <Container>
            <HeaderRoot style={{ minWidth: 1056, backgroundColor: "transparent" }}>
                <HeaderBack onClick={handleClick}/>
                {/*<HeaderLogo src="./images/logo.png" />*/}
                <HeaderTitleWrapper>
                    <HeaderTitle>{'Завтра завтрак'}</HeaderTitle>
                    <HeaderSubtitle>{'Subtitle text'}</HeaderSubtitle>
                </HeaderTitleWrapper>
                <HeaderContent>
                    {/*<Content />*/}
                </HeaderContent>
                <IconCartAlt/>
            </HeaderRoot>
        </Container>
>>>>>>> 94ed2a3e4e7893abdeff263cc0032f7f9a5b57b8:src/Toolbar.tsx
    );
});
