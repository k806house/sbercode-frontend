import React, {FC, memo, useEffect, useRef, useState} from "react";
import {AssistantAppState, createAssistant} from "@sberdevices/assistant-client";
import {Container, Row, Col} from "@sberdevices/ui/components/Grid";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {
    Card, CardBody, CardContent, CardMedia, CardHeadline1,
    Cell, CellIcon, CellDisclosure, CellListItem,
    TextBox, TextBoxTitle, TextBoxSubTitle, TextBoxBigTitle,
    MarkedList, MarkedItem, TextBoxLabel,
    TimePicker, DatePicker
} from '@sberdevices/ui';
import {IconAvatar, IconInfo, IconSpinner} from "@sberdevices/plasma-icons";
import {primary} from "@sberdevices/plasma-tokens";
import {Input} from "@sberdevices/ui/components/Input";
import {isSberBox} from "@sberdevices/ui/utils";
import {Toolbar} from "./Toolbar";
import {Item} from "./store"

type AlarmProps = {
    items: Item[];
    cafeName: string;
};

export const Alarm: FC<AlarmProps> = memo((props: AlarmProps) => {
    const items = props.items;
    return (
        <Container>
            <Card style={{ width: '20rem' }}>
                <CardContent compact>
                    {/*Check*/}
                    <Cell
                        content={
                            <TextBox>
                                <TextBoxBigTitle>{`${props.cafeName}`}</TextBoxBigTitle>
                                {/*<TextBoxSubTitle>{'status'}</TextBoxSubTitle>*/}
                            </TextBox>
                        }
                        right={
                            <CellIcon>
                                <IconInfo/>
                            </CellIcon>
                        }
                    />
                    <MarkedList>
                        {items.map((item) => (
                            <MarkedItem text={`${item.name}`} style={{ color: primary }} >
                                <TextBox>1</TextBox>
                                <IconSpinner size="xs" />
                            </MarkedItem>
                        ))}
                    </MarkedList>
                    <CellListItem
                        left={
                            <TextBox>Итого</TextBox>
                        }
                        content={
                            <TextBox></TextBox>
                        }
                        right={
                            <TextBox> 156 Rub</TextBox>
                        }
                    />

                    {/*Address selections*/}
                    <Cell
                        content={<TextBoxBigTitle>{'Доставка'}</TextBoxBigTitle>}
                    />
                    <Row>
                        <Col size={2} style={{ marginBottom: '1rem' }}>
                            <Input placeholder={'Кв./офис'}></Input>
                        </Col>
                        <Col size={2}>
                            <Input placeholder={'Подъезд'}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} style={{ marginBottom: '1rem' }}>
                            <Input placeholder={'Домофон'}></Input>
                        </Col>
                        <Col size={2}>
                            <Input placeholder={'Этаж'}></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={2} style={{ marginBottom: '1rem' }}>
                            <Input placeholder={'Комментарий'}></Input>
                        </Col>
                        <Col size={2}>
                            <Input placeholder={'Телефон'}></Input>
                        </Col>
                    </Row>
                    <Input placeholder={'Время заказа'}></Input>
                    <Button text="Заказать" view="primary" />
                </CardContent>
            </Card>
        </Container>
    );
});
