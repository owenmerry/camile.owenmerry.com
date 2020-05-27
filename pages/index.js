import {useEffect, useState} from 'react';
import {fetchData} from '../helpers/fetch';
import {buildProductList,randomOrderFromLimit} from '../helpers/products';
import { Button, Card, Wrapper, Header, TextBlock } from 'owenmerry-designsystem';

// animation
import { motion, AnimatePresence } from 'framer-motion';
import { animateDropdown, normalTransition } from '../helpers/animations';

export default function Home() {

  //state
  const [isLoading, setIsLoading] = useState(true);
  const [stateOrder, setStateOrder] = useState({});
  const [stateLimit, setStateLimit] = useState(2000);


  useEffect(() => {

    getData();

  },[]);

  const getData = async () => {
    const data = await fetchData('/json/camile.json');
    const dataDominos = await fetchData('/json/dominos.json');

    const priceLimit = stateLimit;
    const productsList = buildProductList(data);
    const myOrder = randomOrderFromLimit(productsList,priceLimit,priceLimit - 500);

    setStateOrder(myOrder);
    setIsLoading(false);
  };


  //functions
  const changeOrder = (limit) => {
    //if(limit !== stateLimit){
      setStateLimit(limit);
    //}
    //getData();
  }
  const menuClicked = () => {

  }
  const generateOrder = () => {
    getData();
  }




  return isLoading ? 'loading' : (
    <div className="container">
    <Header 
      logoURL='/images/camile-logo.png'
            menuSettings={
              {
                align: 'right',
                seperator: 'bordertop',
                items: [
                  {name:'About',ref:'/about'},
                ]
              }
            }
            menuClicked={menuClicked}
            backgroundColor='transparent'
    />
       <Wrapper>
       <motion.div 
       className='Buttons'
       
       >
          <Button color='white' secondary={stateLimit===1000} onClick={() => changeOrder(1000)}>10 euro</Button>
          <Button secondary={stateLimit===2000}onClick={() => changeOrder(2000)}>20 euro</Button>
          <Button secondary={stateLimit===3000}onClick={() => changeOrder(3000)}>30 euro</Button>
        </motion.div>
        <div className='Buttons'>
          <Button onClick={generateOrder}>Generate Order</Button>
        </div>
        <h2>Total: {stateOrder.total}</h2>
       <div className='grid'>
       {stateOrder.order.map((item, index) => (
        <Card
        key={index}
        imageHeight='150px'
        image={item.image}
        title={item.name}
        subtitle={item.section + ' - ' + item.price}
        />
       ))}
       </div>
       </Wrapper>
      <style jsx global>{`
        html,
        body {
          font-family: 'Source Sans Pro', sans-serif;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
            background-color:#92278F;
            color:white;
        }
        * {
          box-sizing: border-box;
        }

        .grid{
          display:grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
        }
        .generateOrder{
          background-color:
        }


        /* mobile styles */
        @media only screen and (max-width: 720px) {
          .grid{
            grid-template-columns: 1fr 1fr;
          }
        }

      `}</style>
    </div>
  )
}
