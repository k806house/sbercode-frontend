import React, { FC, memo, useReducer, useState, useRef, useEffect } from 'react';
import { createSmartappDebugger, createAssistant, AssistantAppState } from '@sberdevices/assistant-client';
import './App.css';
import { Menu } from './Menu';

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
    // const [appState, dispatch] = useReducer(reducer, {
    //     notes: [{ id: 'uinmh', title: 'купить хлеб', completed: false }],
    // });

    const [note, setNote] = useState('');

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

            // if (action) {
            //     dispatch(action);
            // }
        });
    }, []);

    // useEffect(() => {
    //     assistantStateRef.current = {
    //         item_selector: {
    //             items: appState.notes.map(({ id, title }, index) => ({
    //                 number: index + 1,
    //                 id,
    //                 title,
    //             })),
    //         },
    //     };
    // }, [appState]);


    return (
     <Menu name="Теремок"></Menu>
    );
});
