import React, { FC, memo } from "react";
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

type MenuProps = {
  name: string;
  dispatch: any;
  userId: number;
};

interface MenuItem {
  item_id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
}


export const Menu: FC<MenuProps> = memo((props: MenuProps) => {
  let data = JSON.parse(JSON.stringify(JsonData));
  let s = "";
  let i = 0;
  let menu: MenuItem[];

  while (s !== props.name && data.length > i) {
    s = data[i].name;
    i++;
  }

  i--;

  menu = data[i].menu;
  const index = 0;
  const axis = "x";
  const scrollSnapType = "mandatory";
  const detectThreshold = 0.5;
  const scrollAlign = 'center';
  const detectActive = true;
  const animatedScrollByIndex = false;

  

  function addToCart(id:number){
    console.log(id);
    let btn = document.getElementById(`${id}`);
    let action ={
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
                        id="{item_id}"
                        text="В корзину"
                        view="primary"
                        size="s"
                        style={{ marginTop: "1em" }}
                        onClick = {()=>{addToCart(item_id);}}
                    />
                  </CardContent>
                </CardBody>
              </Card>
            </CarouselItem>
        ))}
      </Carousel>
  );
});
