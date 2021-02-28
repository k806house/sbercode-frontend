import React, {FC, memo, useEffect, useRef, useState} from "react";
import {AssistantAppState, createAssistant} from "@sberdevices/assistant-client";
import {Container, Row, Col} from "@sberdevices/ui/components/Grid";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {
    Card, CardBody, CardContent, CardMedia, CardHeadline1,
    Cell,CellIcon, CellDisclosure, CellListItem,
    TextBox, TextBoxTitle, TextBoxSubTitle, TextBoxBigTitle,
    MarkedList, MarkedItem,  TextBoxLabel,
    TimePicker
} from '@sberdevices/ui';
import {IconAvatar, IconInfo, IconSpinner} from "@sberdevices/plasma-icons";
import {primary} from "@sberdevices/plasma-tokens";
import {Input} from "@sberdevices/ui/components/Input";
import {isSberBox} from "@sberdevices/ui/utils";

export const Alarm: FC = memo(() => {
    const isSberbox = isSberBox();
    return (
        <Container>
            <Card style={{ width: '20rem' }}>
                <CardContent compact>
                    {/*<TimePicker*/}
                    {/*    value={*/}
                    {/*        new Date(*/}
                    {/*            now.getFullYear(),*/}
                    {/*            now.getMonth(),*/}
                    {/*            now.getDate(),*/}
                    {/*            number('hours', 0),*/}
                    {/*            number('minutes', 30),*/}
                    {/*            number('seconds', 59),*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    min={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 15, 29)}*/}
                    {/*    max={new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 45, 59)}*/}
                    {/*    options={{*/}
                    {/*        hours: boolean('options.hours', true),*/}
                    {/*        minutes: boolean('options.minutes', true),*/}
                    {/*        seconds: boolean('options.seconds', true),*/}
                    {/*    }}*/}
                    {/*    disabled={boolean('disabled', false)}*/}
                    {/*    controls={boolean('controls', isSberbox)}*/}
                    {/*    onChange={action('onChange')}*/}
                    {/*/>*/}
                    {/*Check*/}
                    <Cell
                        content={
                            <TextBox>
                                <TextBoxBigTitle>{'Название ресторана'}</TextBoxBigTitle>
                                <TextBoxSubTitle>{'Alarm'}</TextBoxSubTitle>
                            </TextBox>
                        }
                        right={
                            <CellIcon>
                                <IconInfo/>
                            </CellIcon>
                        }
                    />
                    <MarkedList>
                        <MarkedItem text="Блюдо 1" style={{ color: primary }} >
                            <TextBox>1</TextBox>
                            <IconSpinner size="xs" />
                        </MarkedItem>
                        <MarkedItem text="Блюдо 2" style={{ color: primary }}>
                            <TextBox>1</TextBox>
                            <IconSpinner size="xs" />
                        </MarkedItem>
                        <MarkedItem text="Блюдо 3" style={{ color: primary }}>
                            <TextBox>2</TextBox>
                            <IconSpinner size="xs" />
                        </MarkedItem>
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
                        <Col size={2}>
                            <Input placeholder={'Комментарий'}></Input>
                        </Col>
                        <Col size={2}>
                            <Input placeholder={'Телефон'}></Input>
                        </Col>
                    </Row>

                    <Button text="Заказать" view="primary" />
                </CardContent>
            </Card>


        </Container>
    );
});
