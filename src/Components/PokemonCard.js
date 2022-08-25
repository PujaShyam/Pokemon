import React, { useEffect, useState } from "react";
//import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InfiniteScroll from "react-infinite-scroll-component";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import axios from "axios";

const PokemonCard = () => {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(1);
  // function

  //   let i = 1;

  const fetchMoreData = async () => {
    const response = await axios.get(
      `https://api.pokemontcg.io/v2/cards?page=${count}&pageSize=6`
    );
    console.log("My Main Response : ", response);
    console.log("My Data Response : ", response.data.data);
    setCards(cards => cards.concat(response.data.data));
    setCount(count + 1);
    console.log("funtion i : ", count);
    console.log("My Cards : ", cards);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={cards.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      <Container style={{backgroundColor: "skyblue"}}>
        <Row>
          {cards.map((item, index) => (
            <Col  key={index} lg={4}>
              <Card style={{ width: "22rem" }} className="my-3">
                <Card.Img variant="top" src={item.images.small} style={{padding: "16px"}}/>

                <Card.Body>
                  <Card.Title className="text-start">
                    {item.name}
                    <span className="float-end">HP: {item.hp}</span>
                  </Card.Title>
                  <Card.Subtitle className="my-2 text-start">
                    Attacks: {item.name}
                  </Card.Subtitle>
                  <Card.Subtitle className="my-2 text-start">
                    Abilities: {item.abilities !== undefined ? item.abilities[0].name : 'N/A'}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </InfiniteScroll>
  );
};

export default PokemonCard;


