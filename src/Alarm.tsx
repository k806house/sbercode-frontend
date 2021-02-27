import React, {FC, memo, useEffect, useRef, useState} from "react";
import {AssistantAppState, createAssistant} from "@sberdevices/assistant-client";
import {Container} from "@sberdevices/ui/components/Grid";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {
    Card,
    CardBody,
    CardContent,
    CardMedia,
    CardHeadline1,
    Cell,
    TextBox,
    TextBoxTitle,
    TextBoxSubTitle,
    CellIcon, CellDisclosure,
} from '@sberdevices/ui';
import {IconAvatar, IconInfo} from "@sberdevices/plasma-icons";

export const Alarm: FC = memo(() => {
    return (
        <Card style={{ width: '20rem' }}>
            <CardContent compact>
                <Cell
                    content={
                        <TextBox>
                            <TextBoxTitle>{'00:00'}</TextBoxTitle>
                            <TextBoxSubTitle>{'Alarm'}</TextBoxSubTitle>
                        </TextBox>
                    }
                    right={
                        <CellIcon>
                            <IconInfo/>
                        </CellIcon>
                    }
                />
            </CardContent>
        </Card>
    );
});
