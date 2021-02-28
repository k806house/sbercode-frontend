import React, {FC, memo} from "react";
import {
    HeaderBack, HeaderContent, HeaderLogo, HeaderTitle, HeaderSubtitle
} from '@sberdevices/ui';
import { Container, Row, Col }  from '@sberdevices/ui';
import {IconCartAlt} from "@sberdevices/plasma-icons";
import {HeaderRoot} from "@sberdevices/ui/components/Header/HeaderRoot";
import {HeaderTitleWrapper} from "@sberdevices/ui/components/Header/HeaderTitleWrapper";
import {Button} from "@sberdevices/ui/components/Button/Button";
import {UserStage} from "./store";

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
