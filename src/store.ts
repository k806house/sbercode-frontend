type Item = {
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

type Action =
    | {
          type: 'add_item';
          item_id: number;
      };

export const reducer = (item: Item, action: Action) => {
    switch (action.type) {
        case 'add_item':
            return {
                ...item,
                item_id: item.item_id,
            };
        default:
            throw new Error();
    }
};
