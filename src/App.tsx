import React, {FC, memo, useEffect, useReducer, useRef, useState} from 'react';
import {AssistantAppState, createAssistant, createSmartappDebugger} from '@sberdevices/assistant-client';
import './App.css';
import {Toolbar} from './Toolbar';
import {Col, Container, Display1, Row} from '@sberdevices/ui';

import {reducer, UserStage} from './store';
import {Menu} from './Menu';
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import {background, body1, gradient} from "@sberdevices/plasma-tokens";
import {darkSber} from "@sberdevices/plasma-tokens/themes/darkSber";
import {Alarm} from "./Alarm";
import {StatusWindow} from "./StatusWindow";

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

const initializeAssistant = (getState: any) => {
    if (process.env.NODE_ENV === 'development' && window.Cypress == null) {
        return createSmartappDebugger({
            token: process.env.REACT_APP_TOKEN ?? '',
            initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
            getState,
        });
    }

    return createAssistant({ getState });
};

export const App: FC = memo(() => {
    const [appState, dispatch] = useReducer(reducer, {
        notes: [{ id: 'uinmh', title: 'купить хлеб', completed: false }],
        user_stages: new Map(),
        user_carts: new Map(),
        user_cafes: new Map(),
        id_to_item: new Map(),
    });

    const [stage, setStage] = useState(UserStage.ChoosingCafe);
    const [cafe, setCafe] = useState('Чебуречная СССР');
    const [user_id, setId] = useState(" ");

    const assistantStateRef = useRef<AssistantAppState>();
    const assistantRef = useRef<ReturnType<typeof createAssistant>>();

    useEffect(() => {
        assistantRef.current = initializeAssistant(() => assistantStateRef.current);

        assistantRef.current.on('data', ({ navigation, action }: any) => {
            if (navigation) {
                switch (navigation.command) {
                    case 'UP':
                        window.scrollTo(0, window.scrollY - 500);
                        break;
                    case 'DOWN':
                        window.scrollTo(0, window.scrollY + 500);
                        break;
                }
            }

            console.log(action);
            if (action) {
                dispatch(action);
                setCafe(appState.user_cafes.get(action.user_id)!);
                setId(action.user_id);
                setStage(appState.user_stages.get(action.user_id)!);
            }
        });
    }, []);

    useEffect(() => {
        assistantStateRef.current = {
            item_selector: {
                items: appState.notes.map(({ id, title }, index) => ({
                    number: index + 1,
                    id,
                    title,
                })),
            },
        };
    }, [appState]);

    const doneNote = (title: string) => {
        assistantRef.current?.sendData({ action: { action_id: 'done', parameters: { title } } });
    };

    if (stage == UserStage.ChoosingItems) {
        console.log("app"+user_id);
        return (
            <ThemeProvider theme={theme}>
                <AppStyled>
                    <DocStyles />
                    <Theme />
                    <Container>
                        <Toolbar setStage={setStage}></Toolbar>
                        <Menu name={cafe} dispatch={dispatch} userId={user_id} appState={appState}></Menu>
                    </Container>
                </AppStyled>
            </ThemeProvider>
        );

    }
    if (stage == UserStage.Checkout) {
        console.log("checkout");
        return (
            <ThemeProvider theme={theme}>
                <AppStyled>
                    <DocStyles />
                    <Theme />
                    <Container>
                        <Toolbar setStage={setStage}></Toolbar>
                        <Alarm items={appState.user_carts.get(user_id)?.items!}
                               setStage={setStage}
                               cafeName={cafe}></Alarm>
                    </Container>
                </AppStyled>
            </ThemeProvider>
        );
    }
    if (stage == UserStage.Final) {
        return (
            <ThemeProvider theme={theme}>
                <AppStyled>
                    <DocStyles />
                    <Theme />
                    <Container>
                        <StatusWindow status={true}></StatusWindow>
                    </Container>
                </AppStyled>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <AppStyled>
                <DocStyles />
                <Theme />
                <Container>
                    <Row>
                        <Col style={{ marginBottom: '1rem' }}></Col>
                    </Row>
                    <Row>
                        <Col style={{ marginBottom: '1rem' }}></Col>
                    </Row>
                    <Row>
                        <Col style={{ marginBottom: '1rem' }} size={1}></Col>
                        <Col style={{ marginBottom: '1rem' }} size={4}>
                            <Display1>Завтра завтрак</Display1>
                        </Col>
                        <Col style={{ marginBottom: '1rem' }} size={1}></Col>
                    </Row>
                </Container>
            </AppStyled>
        </ThemeProvider>
    );
});
