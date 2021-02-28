import { ActionButton } from "@sberdevices/ui";

export type Item = {
    item_id: number,
    img_url: string,
    name: string,
    price: number,
    description: string
};

type Cart = {
    items: Array<Item>,
    time: string,
    address: string,
    name: string
};

type Note = {
    id: string;
    title: string;
    completed: boolean;
};

export enum UserStage {
    ChoosingCafe,
    ChoosingItems,
    Checkout,
};

type State = {
    notes: Array<Note>;
    id_to_item: Map<number, Item>;
    user_stages: Map<number, UserStage>;
    user_carts: Map<number, Cart>;
    user_cafes: Map<number, string>;
};

// type Action =
//     | {
//         type: 'add_item';
//         item_id: number;
//     }
//     | {
//         type: 'add_alarm';
//         alarm: number;
//         user_id: number;
//     };

type Action =
    | {
        type: 'init';
        notes: Array<Note>;
    }
    | {
        type: 'add_note';
        note: string;
    }
    | {
        type: 'done_note';
        id: string;
    }
    | {
        type: 'choose_cafe';
        user_id: number;
        cafe: string;
    }
    | {
        type: 'add_item';
        user_id: number;
        item_id: number;
    }
    | {
        type: 'delete_note';
        id: string;
    };

export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                notes: [...action.notes],
            };

        case 'choose_cafe':
            // console.log(state.user_cafes.get(action.user_id));

            state.user_stages.set(action.user_id, UserStage.ChoosingItems);
            state.user_cafes.set(action.user_id, action.cafe);
            state.user_carts.set(action.user_id, { items: [], time: '', name: '', address: '' });

            // console.log(state.user_cafes.get(action.user_id));
            return state;

        case 'add_item':
            if (!state.user_carts.has(action.user_id)) {
                state.user_carts.set(action.user_id, { items: [], time: '', name: '', address: '' });
            }
            state.user_carts.get(action.user_id)?.items.push(state.id_to_item.get(action.item_id)!);
            return state;

        case 'add_note':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: Math.random().toString(36).substring(7),
                        title: action.note,
                        completed: false,
                    },
                ],
            };

        case 'done_note':
            return {
                ...state,
                notes: state.notes.map((note) => (note.id === action.id ? { ...note, completed: true } : note)),
            };

        case 'delete_note':
            return {
                ...state,
                notes: state.notes.filter(({ id }) => id !== action.id),
            };

        default:
            throw new Error();
    }
};


// export const reducer = (item: Item, action: Action) => {
//     switch (action.type) {
//         case 'add_item':
//             return {
//                 ...item,
//                 item_id: item.item_id,
//             };
//         default:
//             throw new Error();
//     }
// };
