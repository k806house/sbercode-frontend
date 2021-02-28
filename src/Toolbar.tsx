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
import {Button} from "@sberdevices/ui/components/Button/Button";
import {UserStage} from "./store";

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

type ToolbarProps = {
    setStage: any;
};

export const Toolbar: FC<ToolbarProps> = memo((props: ToolbarProps) => {
    function onClickCartButton() {
        props.setStage(UserStage.Checkout);
    }
    return (
        <Container>
            <HeaderRoot style={{ minWidth: 1056, backgroundColor: "transparent" }}>
                <HeaderBack
                    // onClick={handleClick}
                />
                {/*<HeaderLogo src="./images/logo.png" />*/}
                <HeaderTitleWrapper>
                    <HeaderTitle>{'Завтра завтрак'}</HeaderTitle>
                    <HeaderSubtitle>{'кормим вас завтраками'}</HeaderSubtitle>
                </HeaderTitleWrapper>
                <HeaderContent>
                    {/*<Content />*/}
                </HeaderContent>
                <Button contentLeft={<IconCartAlt />}
                        view={"clear"}
                        onClick={onClickCartButton}
                />
            </HeaderRoot>
        </Container>
    );
});
