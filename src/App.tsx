import React, { ReactDOM, FC, memo, useReducer, useState, useRef, useEffect } from 'react';
import { createSmartappDebugger, createAssistant, AssistantAppState } from '@sberdevices/assistant-client';
import './App.css';

import { UserStage, reducer } from './store';
import { Menu } from './Menu';
import { Alarm } from './Alarm';

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

    const [note, setNote] = useState('kekis');
    const [stage, setStage] = useState(UserStage.ChoosingCafe);
    const [cafe, setCafe] = useState('Чебуречная СССР');

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
                setStage(appState.user_stages.get(action.user_id)!);
                setCafe(appState.user_cafes.get(action.user_id)!);
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
        let menu = <Menu name={cafe}></Menu>
        return menu;
    }

    return (
        //<Menu name="Чебуречная СССР"></Menu>
        <main className="container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    dispatch({ type: 'add_note', note });
                    setNote('');
                }}
            >
                <input
                    className="add-note"
                    type="text"
                    placeholder="Add Note"
                    value={note}
                    onChange={({ target: { value } }) => setNote(value)}
                    required
                    autoFocus
                />
            </form>
            <ul className="notes">
                {appState.notes.map((note, index) => (
                    <li className="note" key={note.id}>
                        <span>
                            <span style={{ fontWeight: 'bold' }}>{index + 1}. </span>
                            <span
                                style={{
                                    textDecorationLine: note.completed ? 'line-through' : 'none',
                                }}
                            >
                                {note.title}
                            </span>
                        </span>
                        <input
                            id={`checkbox-note-${note.id}`}
                            className="done-note"
                            type="checkbox"
                            checked={note.completed}
                            onChange={() => doneNote(note.title)}
                            disabled={note.completed}
                        />
                    </li>
                ))}
            </ul>
        </main>
    );
});
