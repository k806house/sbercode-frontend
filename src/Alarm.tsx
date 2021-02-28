import React, {FC, memo, useEffect} from "react";
import {Container, Row, Col} from "@sberdevices/ui/components/Grid";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {
    Card, CardContent, Cell, CellIcon, CellListItem,
    TextBox, TextBoxBigTitle,
    MarkedList, MarkedItem} from '@sberdevices/ui';
import {IconInfo, IconSpinner} from "@sberdevices/plasma-icons";
import {primary} from "@sberdevices/plasma-tokens";
import {Input} from "@sberdevices/ui/components/Input";
import {Item} from "./store"
import { UserStage } from './store';

type AlarmProps = {
    items: Item[];
    cafeName: string;
    setStage: any;
};

export const Alarm: FC<AlarmProps> = memo((props: AlarmProps) => {
    const items = props.items;
    let total = 0;
    items.forEach((item) => {
        total += item.price;
    });
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
                        {items.map((item, id) => (
                            <MarkedItem key={id} text={`${item.name}`} style={{ color: primary }} >
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
                            <TextBox> {total}</TextBox>
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
                    <Button text="Оформить заказ"
                            view="primary"
                            onClick={() => props.setStage(UserStage.Final)}/>
                </CardContent>
            </Card>
        </Container>
    );
});
