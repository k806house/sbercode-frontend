import React, {FC, memo, useEffect, useRef, useState} from "react";
import {AssistantAppState, createAssistant} from "@sberdevices/assistant-client";
import {
    HeaderBack, HeaderContent, HeaderLogo, HeaderTitle, HeaderSubtitle
} from '@sberdevices/ui';
import {IconAvatar, IconInfo} from "@sberdevices/plasma-icons";
import {HeaderRoot} from "@sberdevices/ui/components/Header/HeaderRoot";
import {HeaderTitleWrapper} from "@sberdevices/ui/components/Header/HeaderTitleWrapper";

export const Template: FC = memo(() => {
    function handleClick() {
        console.log('Back Button');
    }
    return (
        <HeaderRoot style={{ minWidth: 1056 }}>
            <HeaderBack onClick={handleClick}/>
            {/*<HeaderLogo src="./images/logo.png" alt="Logo" />*/}
            <HeaderTitleWrapper>
                <HeaderTitle>{'Завтра завтрак'}</HeaderTitle>
                <HeaderSubtitle>{'Subtitle text'}</HeaderSubtitle>
            </HeaderTitleWrapper>
            <HeaderContent>
                {/*<Content />*/}
            </HeaderContent>
        </HeaderRoot>
    );
});
