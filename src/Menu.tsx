import React, { FC, memo, useState, Dispatch, SetStateAction } from "react";
import "./App.css";
import { Button } from "@sberdevices/ui/components/Button/Button";
import JsonData from "./data.json";
import {
  Row,
  CardBody,
  Carousel,
  CarouselItem,
  Card,
  CardContent,
  CardMedia,
  TextBox,
  TextBoxBigTitle,
  TextBoxBiggerTitle,
  TextBoxSubTitle,
} from "@sberdevices/ui";

type Item = {
  item_id: number,
  img_url: string,
  name: string,
  price: number,
  description: string
};

type MenuProps = {
  name: string;
  dispatch: any;
  userId: string;
  appState: any;
};

export const Menu: FC<MenuProps> = memo((props: MenuProps) => {
  let data = JSON.parse(JSON.stringify(JsonData));
  let s = "";
  let i = 0;
  let menu: Item[];

  while (s !== props.name && data.length > i) {
    s = data[i].name;
    i++;
  }

  i--;

  menu = data[i].menu;
  menu.forEach((item) => {
      props.appState.id_to_item.set(item.item_id, item);
  });
  const index = 0;
  const axis = "x";
  const scrollSnapType = "mandatory";
  const detectThreshold = 0.5;
  const scrollAlign = 'center';
  const detectActive = true;
  const animatedScrollByIndex = false;
  var cart = props.appState.user_carts.get(props.userId)!;
  var items : Item[] = cart.items!;

  var stateArray = new Array<boolean>(menu.length);
  for (let i = 0; i < stateArray.length; i++) {
    stateArray[i] = false;
  }

  let [state1, stateSet1] = useState(false);
  let [state2, stateSet2] = useState(false);
  let [state3, stateSet3] = useState(false);
  let [state4, stateSet4] = useState(false);
  var stateArr = [state1, state2, state3, state4];
  var stateSet = [stateSet1, stateSet2, stateSet3, stateSet4];  
  

  function addToCart(id:number){

    // for (let i = 0; i < items.length; i++) {
    //   for (let j = 0; j < stateArray.length; j++) {
    //     if (items[i].item_id === menu[j].item_id){
    //       stateArray[j] = true;
    //     }
    //   }
    // }
    let action = {
      user_id : props.userId,
      type: 'add_item',
      item_id: id
    }

    props.dispatch(action)
  }

  return (
      <Carousel
          as={Row}
          axis={axis}
          index={index}
          animatedScrollByIndex={animatedScrollByIndex}
          scrollAlign={scrollAlign}
          scrollSnapType={scrollSnapType}
          detectActive={detectActive}
          detectThreshold={detectThreshold}
      >
        {menu.map(({ name, price, img_url, description, item_id }, i) => (
            <CarouselItem key={`item:${i}`} style={{ padding: "0 1rem" }}>
              <Card style={{ width: "25rem", height: "40rem" }}>
                <CardBody>
                  <CardMedia src={img_url}  placeholder="blini.jpg" ratio={"1 / 1"} />
                  <CardContent cover={false}>
                    <TextBox>
                      <TextBoxBigTitle>{name}</TextBoxBigTitle>
                      <TextBoxBiggerTitle>{price} ₽</TextBoxBiggerTitle>
                      <TextBoxSubTitle style={{height: "3rem"}}>{description}</TextBoxSubTitle>
                    </TextBox>
                    <Button
                        key={item_id}
                        text={stateArr[i]?"В корзине":"В корзину"}
                        view="primary"
                        disabled={stateArr[i]}
                        size="s"
                        style={{ marginTop: "1em" }}
                        onClick = {()=>{addToCart(item_id); stateSet[i](true)}}
                        //onClick = {handleClick}
                    />
                  </CardContent>
                </CardBody>
              </Card>
            </CarouselItem>
        ))}
      </Carousel>
  );
});
