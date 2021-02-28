import React, {FC, memo} from "react";
import {Container, Row, Col} from "@sberdevices/ui/components/Grid";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {
    Card,
    TextBox,
} from '@sberdevices/ui';

type StatusWindowProps = {
    status: boolean;
};

export const StatusWindow: FC<StatusWindowProps> = memo((props: StatusWindowProps) => {
    if (props.status) {
        return (
            <Container>
                <Card>
                    <TextBox>Спасибо за заказ! Сладких снов :)</TextBox>
                </Card>
            </Container>
        );
    } else {
        return (
            <Container>
                <Card>
                    <TextBox>Ошибочка!</TextBox>
                </Card>
            </Container>
        );
    }
});
